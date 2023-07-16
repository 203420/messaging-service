export class Message {
  constructor(
    readonly message: string,
    readonly sendBy: number,
    readonly timeStamp: string
  ) {}
}
