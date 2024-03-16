import { useState } from "react";
import useCreateChatRoom from "../../hooks/useCreateChatRoom";
import { BsSend } from "react-icons/bs";

const NewChatRoom = () => {
  const [chatName, setChatName] = useState("");
  const { createChatRoom, loading } = useCreateChatRoom();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(chatName);
    if (!chatName) return;
    await createChatRoom(chatName);
    setChatName("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="new chatRoom"
        className="input input-bordered rounded-full"
        value={chatName}
        onChange={(e) => setChatName(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        {loading ? (
          <div className="loading loading-spinner"></div>
        ) : (
          <BsSend className="w-6 h-6 outline-none" />
        )}
      </button>
    </form>
  );
};
export default NewChatRoom;

// STARTER CODE SNIPPET
// import { IoSearchSharp } from "react-icons/io5";

// const NewChatRoom = () => {
// 	return (
// 		<form className='flex items-center gap-2'>
// 			<input type='text' placeholder='Search…' className='input input-bordered rounded-full' />
// 			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
// 				<IoSearchSharp className='w-6 h-6 outline-none' />
// 			</button>
// 		</form>
// 	);
// };
// export default NewChatRoom;
