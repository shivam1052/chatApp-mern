import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";
import { authStore } from "./authStore.js";

export const chatStore = create((set, get) => ({
  users: [],
  messages: [],
  selectedUser: null,

  getUsers: async () => {
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data });
      toast.success("Users fetched successfully");
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  },

  getMessages: async () => {
    const { selectedUser } = get();
    try {
      const res = await axiosInstance.get(
        `/message/getmessages/${selectedUser._id}`,
      );
      set({ messages: res.data });
      toast.success("Messages fetched successfully");
    } catch (error) {
      toast.error("Failed to fetch messages");
    }
  },

  sendMessages: async (data) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/message/sendmessage/${selectedUser._id}`,
        data,
      );
      set({ messages: [...messages, res.data] });
      toast.success("Message sent successfully");
    } catch (error) {
      toast.error("Failed to send message");
    }
  },

  setSelectedUser: (user) => set({ selectedUser: user }),

  listenForNewMessage: () => {
    const socket = authStore.getState().socket;
    if (!socket) return;
    socket.on("newMessage", (newMessage) => {
      set({ messages: [...get().messages, newMessage] });
    });
  },

  stopListeningForMessage: () => {
    const socket = authStore.getState().socket;
    if (!socket) return;
    socket.off("newMessage");
  },
}));
