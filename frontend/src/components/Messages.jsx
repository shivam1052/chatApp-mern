import { chatStore } from "../store/chatStore.js";
import { authStore } from "../store/authStore.js";
import { useEffect, useRef } from "react";

const Messages = () => {
  const {
    selectedUser,
    getMessages,
    messages,
    listenForNewMessage,
    stopListeningForMessage,
  } = chatStore();

  const { loggedUser } = authStore();

  const messageRef = useRef(null);

  useEffect(() => {
    if (!selectedUser) return;
    getMessages();
    listenForNewMessage();
    return () => stopListeningForMessage();
  }, [selectedUser]);

  //Autoscroll for every new message
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (messages.length === 0)
    return (
      <div className="flex flex-1 items-center justify-center text-gray-400 p-2">
        No messages yet
      </div>
    );

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 rounded-md">
      {messages.map((message) =>
        message.senderId === loggedUser._id ? (
          // send message right side
          <div className="flex items-end gap-3 justify-end" key={message._id}>
            <div className="bg-blue-500 text-white p-3 rounded-lg shadow-md max-w-xs lg:max-w-md break-words whitespace-pre-wrap">
              <p className="text-sm">{message.text}</p>
            </div>
            <img
              src={loggedUser.profilepic}
              alt="Your Avatar"
              className="w-10 h-10 rounded-full object-cover shadow-md"
            />
          </div>
        ) : (
          // received message left side
          <div className="flex items-start gap-3" key={message._id}>
            <img
              src={selectedUser.profilepic}
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover shadow-md"
            />
            <div className="bg-gray-100 p-3 rounded-lg shadow-sm max-w-xs lg:max-w-md break-words whitespace-pre-wrap">
              <p className="text-sm text-gray-900">{message.text}</p>
            </div>
          </div>
        ),
      )}
      <div ref={messageRef}></div>
    </div>
  );
};

export default Messages;
