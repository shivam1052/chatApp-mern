import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";

export const authStore = create(
  persist(
    (set, get) => ({
      loggedUser: null,
      onlineUsers: [],
      socket: null,

      signup: async (data) => {
        try {
          const res = await axiosInstance.post("/auth/signup", data);

          set({ loggedUser: res.data });

          toast.success("Signup successful");
          get().connectSocket();
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
          get().connectSocket();
        } catch (error) {
          toast.error("Login failed please try again.");
          set({ loggedUser: null });
        }
      },

      logout: async () => {
        try {
          await axiosInstance.get("/auth/logout");

          get().disconnectSocket();
          set({ loggedUser: null, socket: null, onlineUsers: [] });
          localStorage.removeItem("chat-app-storage");

          toast.success("Logout successful");
        } catch (error) {
          toast.error("Logout failed please try again");
        }
      },

      connectSocket: () => {
        const { loggedUser, socket } = get();

        if (!loggedUser?._id) return;

        if (socket) {
          console.log("Socket already exists");
          return;
        }
        const newSocket = io("https://chatapp-mern-backend-xf7q.onrender.com", {
          query: { userId: loggedUser._id },
        });

        set({ socket: newSocket });

        newSocket.on("getOnlineUsers", (userIds) => {
          set({ onlineUsers: userIds });
        });
      },

      disconnectSocket: () => {
        const { socket } = get();
        if (socket?.connected) socket.disconnect();
      },
    }),
    {
      name: "chat-app-storage",

      partialize: (state) => ({
        loggedUser: state.loggedUser,
      }),
    },
  ),
);
