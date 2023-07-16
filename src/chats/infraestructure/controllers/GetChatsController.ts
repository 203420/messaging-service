import { Request, Response } from "express";

import { GetChatsUseCase } from "../../application/GetChatsUseCase";

export class GetChatsController {
  constructor(readonly getChatsUseCase: GetChatsUseCase) {}

  async run(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const chats = await this.getChatsUseCase.run(Number(id));
      res.status(200).send(chats);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
