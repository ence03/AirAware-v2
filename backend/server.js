import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";

import { connectDB } from "./src/lib/db.js";
import { authenticateUser } from "./src/middlewares/authenticate.js";
import authRoutes from "./src/routes/auth.route.js";
import sensorDataRoutes from "./src/routes/sensorData.route.js";
import deviceRoutes from "./src/routes/device.route.js";
import averageRoutes from "./src/routes/average.route.js";
import userRoutes from "./src/routes/user.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (adjust for production)
  },
});

// Real-Time Communication via Socket.IO
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Attach Socket.IO instance to every request for controllers to use
app.use((req, res, next) => {
  req.io = io; // Attach the Socket.IO instance to the request object
  next();
});

server.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
  connectDB();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/api/test", (req, res) => {
  res.send({ success: true, message: "Hello World" });
});

app.use("/api/auth", authRoutes);
app.use("/api/sensorData", sensorDataRoutes);
app.use("/api/device", deviceRoutes);
app.use("/api/average", averageRoutes);
app.use("/api/users", authenticateUser, userRoutes);
