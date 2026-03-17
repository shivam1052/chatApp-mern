import React from "react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import { chatStore } from "../store/chatStore.js";
import NoChatSelected from "../components/NoChatSelected";

const Homepage = () => {
  const { selectedUser } = chatStore();
  return (
    <div
      className="flex flex-row overflow-hidden bg-base-100 min-h-screen
     rounded-lg shadow-cl w-full h-[calc(100vh-8rem)]"
    >
      <Sidebar />
      <main className="flex-1 bg-gray-900">
        {selectedUser ? <ChatContainer /> : <NoChatSelected />}
      </main>
    </div>
  );
};

export default Homepage;
