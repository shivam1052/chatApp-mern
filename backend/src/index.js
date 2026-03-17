import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import dns from "dns";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import messageRoute from "./routes/messageRoute.js";
import { app, server } from "./lib/socket.js";
import path from "path";

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

//code for deployment
if (process.env.NODE_ENV === "production") {
  const dirPath = path.resolve();

  app.use(express.static(path.join(dirPath, "frontend", "dist")));

  app.use((req, res) => {
    res.sendFile(path.join(dirPath, "frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
