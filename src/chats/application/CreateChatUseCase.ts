import { Chat } from "../domain/Chat";
import { ChatRepository } from "../domain/ChatRepository";

export class CreateChatUseCase {
  constructor(readonly chatRepository: ChatRepository) {}

  async run(chat: Chat) {
    return await this.chatRepository.createChat(chat);
  }
}
