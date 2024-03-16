import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import useGetConversations from "./useGetConversations";

const useGetUsers = () => {
  const { setLoading } = useGetConversations();
  const [consernedUsers, setConsernedUsers] = useState([]);
  const { selectedConversation } = useConversation();

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
  }, [selectedConversation?.id, setLoading]);

  return { consernedUsers };
};
export default useGetUsers;
