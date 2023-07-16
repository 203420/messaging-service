import { Message } from "./Message";

export class Chat {
  constructor(
    readonly id: number,
    readonly messages: Message[] | null,
    readonly user1: number,
    readonly username1: string,
    readonly user2: number,
    readonly username2: string
  ) {}
}
