import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useGetUsers = () => {
  const [loading, setLoading] = useState(false);
  const { selectedConversation, consernedUsers, setConsernedUsers } =
    useConversation();

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/chatroom/get/users/${selectedConversation.id}`
        );
        const data = await res.json();
        console.log("users.......", data, res);
        if (data.error) {
          throw new Error(data.error);
        }
        setConsernedUsers(data.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, [selectedConversation?.id, setLoading, setConsernedUsers]);

  return { consernedUsers, loading };
};
export default useGetUsers;
