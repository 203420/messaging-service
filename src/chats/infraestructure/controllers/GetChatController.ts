import { Request, Response } from "express";

import { GetChatUseCase } from "../../application/GetChatUseCase";

export class GetChatController {
  constructor(readonly getChatUseCase: GetChatUseCase) {}

  async run(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const chat = await this.getChatUseCase.run(Number(id));
      res.status(200).send(chat);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
