import { ChatRepository } from "../domain/ChatRepository";

export class GetChatUseCase {
  constructor(readonly chatRepository: ChatRepository) {}

  async run(id: number) {
    return await this.chatRepository.getChat(id);
  }
}
