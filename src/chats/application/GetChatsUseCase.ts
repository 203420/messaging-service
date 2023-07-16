import { ChatRepository } from "../domain/ChatRepository";

export class GetChatsUseCase {
  constructor(readonly chatRepository: ChatRepository) {}

  async run(userId: number) {
    return await this.chatRepository.getChats(userId);
  }
}
