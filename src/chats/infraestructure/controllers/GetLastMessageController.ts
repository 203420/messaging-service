import { Request, Response } from "express";

import { GetLastMessageUseCase } from "../../application/GetLastMessageUseCase";

export class GetLastMessageController {
  constructor(readonly getLastMessageUseCase: GetLastMessageUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const msg = await this.getLastMessageUseCase.run(
        Number(data.userId),
        Number(data.chatId)
      );
      res.status(200).send(msg);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
