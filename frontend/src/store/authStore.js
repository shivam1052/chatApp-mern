import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";

export const authStore = create((set) => ({
  loggedUser: null,
  onlineUser: [],

  signup: async (data) => {
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ loggedUser: res.data });
      toast.success("Signup successful");
    } catch (error) {
      toast.error("Signup failed please try again.");
      set({ loggedUser: null });
    }
  },

  login: async (data) => {
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ loggedUser: res.data });
      toast.success("Login successful");
    } catch (error) {
      toast.error("Login failed please try again.");
      set({ loggedUser: null });
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.get("/auth/logout");
      set({ loggedUser: null });
      toast.success("Logout successful");
    } catch (error) {
      toast.error("Logout failed please try again");
    }
  },
}));
