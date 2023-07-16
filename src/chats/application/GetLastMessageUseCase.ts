import { ChatRepository } from "../domain/ChatRepository";

export class GetLastMessageUseCase {
  constructor(readonly chatRepository: ChatRepository) {}

  async run(userId: number, chatId: number) {
    return await this.chatRepository.getLastMessage(userId, chatId);
  }
}
