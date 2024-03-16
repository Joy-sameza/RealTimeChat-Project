/* eslint-disable react/prop-types */
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";
import useGetUsers from "../../hooks/useGetUsers";
import { extractTime } from "../../utils/extractTime";
// import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  // const { selectedConversation } = useConversation();
  const { consernedUsers } = useGetUsers();
  const fromMe = message.senderId === authUser.id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const owner = consernedUsers.find((x) => x.id === message.senderId);
  const profilePicture = fromMe
    ? authUser.profilePicture
    : owner?.profilePicture ?? "";
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(owner?.id) ?? false;
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className={`chat-image avatar ${isOnline ? "online" : ""}`}>
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePicture} />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
      >
        {message.content}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};
export default Message;
