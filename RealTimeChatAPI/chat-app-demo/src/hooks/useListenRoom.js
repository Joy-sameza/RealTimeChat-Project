import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useListenRooms = () => {
  const { socket } = useSocketContext();
  const { authUser } = useAuthContext();
  const { selectedConversation, conversations, setConversations } =
    useConversation();

  useEffect(() => {
    socket?.on("joinRoom", (data) => {
      toast.success(data);
      const sound = new Audio(notificationSound);
      sound.play();
    });

    socket?.on("newRoom", (data) => {
      toast.success("new chatroom aveilable");
      console.log("newroom", data);
      setConversations([...conversations, data]);
    });

    socket?.on("leaveRoom", (data) => {
      toast.success(data);
      const sound = new Audio(notificationSound);
      sound.play();
    });

    return () => {
      socket?.off("leaveRoom", selectedConversation?.id, authUser.userName);
      socket?.off("newMessage");
      socket?.off("newRoom");
      socket?.off("joinRoom");
    };
  }, [authUser, selectedConversation, conversations, setConversations, socket]);
  return { conversations };
};
export default useListenRooms;
