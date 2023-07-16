import { ChatRepository } from "../domain/ChatRepository";
import { Message } from "../domain/Message";

export class SendMessageUseCase {
  constructor(readonly chatRepository: ChatRepository) {}

  async run(id: number, message: Message) {
    return await this.chatRepository.updateChat(id, message);
  }
}
