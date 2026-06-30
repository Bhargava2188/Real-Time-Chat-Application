import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/authRouter.js";
import messageRoutes from "./routes/messageRouter.js";
import userRoutes from "./routes/userRouter.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// CORS (allow frontend from GitHub Pages)
app.use(
	cors({
		origin: "https://bhargava2188.github.io",
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE"],
	})
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Root route (optional)
app.get("/", (req, res) => {
	res.send("Backend is running...");
});

// Start server
server.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server running on port ${PORT}`);
});