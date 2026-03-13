import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";

export const authStore = create((set) => ({
  loggedUser: null,

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
}));
