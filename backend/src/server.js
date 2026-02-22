import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Config/Database.js";
import boardRoutes from "./routes/BoardRoute.js";
import authRoutes from "./routes/authRoute.js";

dotenv.config();

const startServer = async () => {
  try {
    // Connect to Database FIRST
    await connectDB();

    const app = express();
    const server = http.createServer(app);

    // CORS Config (better than "*")
    const allowedOrigin = process.env.CLIENT_URL || "http://localhost:5173";

    app.use(
      cors({
        origin: allowedOrigin,
        credentials: true,
      })
    );

    app.use(express.json());

    // Routes
    app.use("/api/auth", authRoutes);
    app.use("/api/boards", boardRoutes);

    app.get("/", (req, res) => {
      res.send("SyncBoard API Running 🚀");
    });

    // Socket.io Setup
    const io = new Server(server, {
      cors: {
        origin: allowedOrigin,
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log("User Connected:", socket.id);

      socket.on("join-room", (roomId) => {
        socket.join(roomId);
        console.log(`User joined room: ${roomId}`);
      });

      socket.on("draw", (data) => {
        socket.to(data.roomId).emit("draw", data);
      });

      socket.on("leave-room", (roomId) => {
        socket.leave(roomId);
      });

      socket.on("disconnect", () => {
        console.log("User Disconnected:", socket.id);
      });
    });

    const PORT = process.env.PORT || 5000;

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();