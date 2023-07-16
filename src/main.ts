import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import http from "http";
import path from "path";
import { Server as WebSockerServer } from "socket.io";

import { chatRouter } from "./chats/infraestructure/ChatRouter";
import { config } from "./config";

const currentDir = __dirname;
const parentDir = path.dirname(currentDir);

function boostrap() {
  const app = express();
  const server = http.createServer(app);
  const io = new WebSockerServer(server, {
    cors: { origin: "*" },
  });

  app.use(bodyParser.json());
  app.use(cors());

  app.use("/chats", chatRouter);
  app.use("/chats-uploads/:filename", (req, res) => {
    const filename = req.params.filename;
    const imagePath = path.join(parentDir, "uploads", filename);
    res.sendFile(imagePath);
  });

  io.on("connection", (socket) => {
    console.log(`Connected: ${socket.id}`);
    socket.emit("server:load-chats");

    socket.on("client:new-chat", (userId) => {
      socket.broadcast.emit("server:new-chat", userId);
      console.log("New chat");
    });

    socket.on("client:new-message", (userId) => {
      socket.broadcast.emit("server:new-message", userId);
      socket.emit("server:load-messages", userId);
      console.log("New message");
    });
  });

  const { port } = config.server;

  server.listen(port, () => {
    console.log(`[APP] - Starting application on port ${port}`);
  });
}

boostrap();
