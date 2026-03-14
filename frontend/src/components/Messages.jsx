import { chatStore } from "../store/chatStore.js";
import { authStore } from "../store/authStore.js";
import { useEffect } from "react";

const Messages = () => {
  const { selectedUser, getMessages, messages } = chatStore();
  const { loggedUser } = authStore();

  useEffect(() => {
    getMessages();
  }, [getMessages]);

  if (messages.length === 0)
    return (
      <div className="flex flex-1 items-center justify-center text-gray-400 p-2">
        No messages yet
      </div>
    );

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 rounded-md">
      {messages.map((message) =>
        message.senderId === selectedUser._id ? (
          <div className="flex items-start gap-3">
            <img
              src={selectedUser.profilepic}
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover shadow-md"
            />
            <div className="bg-gray-100 p-3 rounded-lg shadow-sm max-w-xs lg:max-w-md">
              <p className="text-sm text-gray-900">{message.text}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-end gap-3 justify-end">
            <div className="bg-blue-500 text-white p-3 rounded-lg shadow-md max-w-xs lg:max-w-md">
              <p className="text-sm">{message.text}</p>
            </div>
            <img
              src={loggedUser.profilepic}
              alt="Your Avatar"
              className="w-10 h-10 rounded-full object-cover shadow-md"
            />
          </div>
        ),
      )}
    </div>
  );
};

export default Messages;
