// const express = require('express');

// const dotenv = require('dotenv');
// dotenv.config();
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from "./routes/authRouter.js";
import messageRoutes from "./routes/messageRouter.js";
import userRoutes from "./routes/userRouter.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app,server } from './socket/socket.js'; 
const PORT = process.env.PORT || 5000;
dotenv.config();

app.use(express.json()); //to parse the incoming requests with JSON payloads (from req.body)
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); //to parse the cookies from the incoming requests (from req.cookies)

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users", userRoutes);  

// app.get("/",(req,res) => {
//     //root route for home page localhost:5000/
//      res.send("Hello World!"); 
// })

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
});