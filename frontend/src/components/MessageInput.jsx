import { LuSendHorizontal } from "react-icons/lu";
import { chatStore } from "../store/chatStore.js";
import { useState } from "react";

const MessageInput = () => {
  const { sendMessages } = chatStore();
  const [text, setText] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();

    try {
      await sendMessages({
        text: text.trim(),
      });
      setText("");
    } catch (error) {
      console.error("Failed to send message");
    }
  };

  return (
    <div className="p-1 md:p-2 bg-base-200 fixed bottom-2">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-2 rounded-lg md:rounded-xl focus:outline-none focus:ring-1 focus:ring-primary transition-colors text-gray-100 bg-slate-700 shadow-sm border border-base-300 text-sm md:text-base xl:w-[1150px] sm:w-[520px]"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="p-2 md:p-3 bg-primary text-white rounded-lg md:rounded-xl hover:bg-primary-focus flex items-center justify-center shadow-xl bg-slate-700"
          onClick={handleSendMessage}
        >
          <LuSendHorizontal className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
