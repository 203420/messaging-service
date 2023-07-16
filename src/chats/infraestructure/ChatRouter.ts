import express from "express";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/../../../uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

import {
  createChatController,
  getChatController,
  getChatsController,
  getLastMessageController,
  sendMessageController,
} from "./dependencies";

export const chatRouter = express.Router();

chatRouter.post(
  "/",
  upload.any(),
  createChatController.run.bind(createChatController)
);
chatRouter.put(
  "/msg/:id",
  upload.any(),
  sendMessageController.run.bind(sendMessageController)
);
chatRouter.get("/list/:id", getChatsController.run.bind(getChatsController));
chatRouter.get(
  "/msg/",
  upload.any(),
  getLastMessageController.run.bind(getLastMessageController)
);
chatRouter.get(
  "/:id",
  upload.any(),
  getChatController.run.bind(getChatController)
);
