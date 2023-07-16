import { Request, Response } from "express";

import { CreateChatUseCase } from "../../application/CreateChatUseCase";
import { Chat } from "../../domain/Chat";
import { Message } from "../../domain/Message";

export class CreateChatController {
  constructor(readonly createChatUseCase: CreateChatUseCase) {}

  async run(req: Request, res: Response) {
    const files: Express.Multer.File[] = req.files as Express.Multer.File[];
    const time_now = new Date();
    const data = req.body;
    let msg_content = null;
    try {
      files.length > 0
        ? (msg_content = "/chats-uploads/" + files[0].filename)
        : (msg_content = data.message);

      //console.log(`DATE 1:  ${time_now.getHours()}:${time_now.getMinutes()}`)
      //console.log(`DATE 2:  ${time_now.getHours()}:${time_now.getMinutes().toString()}`)

      const chat = new Chat(
        Number(data.id),
        [
          new Message(
            msg_content,
            data.sendBy,
            `${time_now.getHours()}:${
              time_now.getMinutes() < 10
                ? "0" + time_now.getMinutes()
                : time_now.getMinutes()
            }`
          ),
        ],
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
