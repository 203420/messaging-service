import { Chat } from "./Chat";
import { Message } from "./Message";

export interface ChatRepository {
  createChat(chat: Chat): Promise<Chat | null>;
  updateChat(id: number, message: Message): Promise<boolean | null>;
  getChats(userId: number): Promise<Chat[] | null>;
  getChat(id: number): Promise<Chat | null>;
  getLastMessage(userId: number, chatId: number): Promise<Message | null>;
}
