import { Request, Response } from "express";
import moment from "moment";

import { SendMessageUseCase } from "../../application/SendMessageUseCase";
import { Message } from "../../domain/Message";

export class SendMessageController {
  constructor(readonly sendMessageUseCase: SendMessageUseCase) {}

  async run(req: Request, res: Response) {
    const id = req.params.id;
    const files: Express.Multer.File[] = req.files as Express.Multer.File[];
    const data = req.body;
    let msg_content = null;
    try {
      files.length > 0
        ? (msg_content = "/chats-uploads/" + files[0].filename)
        : (msg_content = data.message);

      const currentTime = moment().format("HH:mm");

      const reponse = this.sendMessageUseCase.run(
        Number(id),
        new Message(msg_content, data.sendBy, currentTime.toString())
      );

      res.status(200).send(reponse);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
