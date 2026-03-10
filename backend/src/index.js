import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";

dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();

app.use("/api/auth", authRoute);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
