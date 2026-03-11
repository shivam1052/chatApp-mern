import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import dns from "dns";
import authRoute from "./routes/authRoute.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();
const PORT = process.env.PORT || 3001;
connectDB();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoute);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
