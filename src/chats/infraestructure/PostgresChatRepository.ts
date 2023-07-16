import { pool } from "../../database";
import { Chat } from "../domain/Chat";
import { ChatRepository } from "../domain/ChatRepository";
import { Message } from "../domain/Message";

export class PostgresChatRepository implements ChatRepository {
  async createChat(chat: Chat): Promise<Chat | null> {
    const sql =
      "INSERT INTO chats (messages, user1, user2, username1, username2) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [
      chat.messages,
      chat.user1,
      chat.user2,
      chat.username1,
      chat.username2,
    ];
    try {
      const result = await pool.query(sql, values);
      if (result.rows.length > 0) {
        const createdChatData = result.rows[0];
        const createdChat: Chat = {
          id: createdChatData.id,
          messages: JSON.parse(createdChatData.messages),
          user1: createdChatData.user1,
          username1: createdChatData.username1,
          user2: createdChatData.user2,
          username2: createdChatData.username2,
        };
        return createdChat;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async updateChat(id: number, message: Message): Promise<boolean | null> {
    const sql =
      "UPDATE chats SET messages = array_append(messages, $2) WHERE id = $1";
    const values = [id, JSON.stringify(message)];
    try {
      const result = await pool.query(sql, values);
      if (result.rows.length > 0) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }

  async getChats(userId: number): Promise<Chat[] | null> {
    const sql = "SELECT * FROM chats WHERE (user1 = $1 OR user2 = $1)";
    const values = [userId];
    try {
      const result = await pool.query(sql, values);
      const chats: Chat[] = result.rows.map((chatData: any) => {
        let messages: Message[] = [];
        try {
          messages = chatData.messages.map(
            (message: string) => JSON.parse(message) as Message
          );
        } catch (error) {
          console.error(`Error parsing 'messages' to JSON: ${error}`);
        }
        return {
          id: chatData.id,
          messages,
          user1: Number(chatData.user1),
          username1: chatData.username1,
          user2: Number(chatData.user2),
          username2: chatData.username2,
        };
      });
      return chats;
    } catch (error) {
      throw error;
    }
  }

  async getChat(id: number): Promise<Chat | null> {
    const sql = "SELECT * FROM chats WHERE id = $1";
    const values = [id];
    try {
      const result = await pool.query(sql, values);
      if (result.rows.length > 0) {
        let messages: Message[] = [];
        const chatData = result.rows[0];

        try {
          messages = chatData.messages.map(
            (message: string) => JSON.parse(message) as Message
          );
        } catch (error) {
          console.error(`Error parsing 'messages' to JSON: ${error}`);
        }

        const chat: Chat = {
          id: chatData.id,
          messages: messages,
          user1: Number(chatData.user1),
          username1: chatData.username1,
          user2: Number(chatData.user2),
          username2: chatData.username2,
        };
        return chat;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async getLastMessage(
    userId: number,
    chatId: number
  ): Promise<Message | null> {
    const sql =
      "SELECT messages FROM chats WHERE id = $1 AND (user1 = $2 OR user2 = $2)";
    const values = [chatId, userId];
    try {
      const result = await pool.query(sql, values);
      if (result.rows.length > 0) {
        const messages = result.rows[0];
        return JSON.parse(
          messages.messages[messages.messages.length - 1]
        ) as Message;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}
