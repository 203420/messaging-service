import { Request, Response } from "express";
import moment from "moment";

import { CreateChatUseCase } from "../../application/CreateChatUseCase";
import { Chat } from "../../domain/Chat";
import { Message } from "../../domain/Message";

export class CreateChatController {
  constructor(readonly createChatUseCase: CreateChatUseCase) {}

  async run(req: Request, res: Response) {
    const files: Express.Multer.File[] = req.files as Express.Multer.File[];
    const data = req.body;
    let msg_content = null;
    try {
      files.length > 0
        ? (msg_content = "/chats-uploads/" + files[0].filename)
        : (msg_content = data.message);

      const currentTime = moment().format("HH:mm");

      const chat = new Chat(
        Number(data.id),
        [new Message(msg_content, data.sendBy, currentTime.toString())],
        Number(data.user1),
        data.username1,
        Number(data.user2),
        data.username2
      );
      const createdChat = await this.createChatUseCase.run(chat);
      res.status(200).send(createdChat);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
