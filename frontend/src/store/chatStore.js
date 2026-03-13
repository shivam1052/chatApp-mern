import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";

export const chatStore = create((set) => ({
  users: [],

  getUsers: async () => {
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data });
      toast.success("Users fetched successfully");
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  },
}));
