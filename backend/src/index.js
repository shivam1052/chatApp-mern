import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import dns from "dns";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import messageRoute from "./routes/messageRoute.js";
import { app, server } from "./lib/socket.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();
const PORT = process.env.PORT || 3001;
connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
