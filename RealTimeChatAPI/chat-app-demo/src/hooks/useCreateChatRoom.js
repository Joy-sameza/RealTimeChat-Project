import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useCreateChatRoom = () => {
  const [loading, setLoading] = useState(false);
  const { authUser } = useAuthContext();

  const createChatRoom = async (name) => {
    setLoading(true);
    try {
      const res = await fetch("/api/chatroom/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description: `chatroom ${authUser.userName}`,
          authorId: authUser.id,
          locked: false,
          open: true,
        }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      // console.log(selectedConversation);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { createChatRoom, loading };
};
export default useCreateChatRoom;
