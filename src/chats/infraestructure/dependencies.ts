import { CreateChatUseCase } from "../application/CreateChatUseCase";
import { GetChatsUseCase } from "../application/GetChatsUseCase";
import { GetChatUseCase } from "../application/GetChatUseCase";
import { GetLastMessageUseCase } from "../application/GetLastMessageUseCase";
import { SendMessageUseCase } from "../application/SendMessageUseCase";
import { CreateChatController } from "./controllers/CreateChatController";
import { GetChatController } from "./controllers/GetChatController";
import { GetChatsController } from "./controllers/GetChatsController";
import { GetLastMessageController } from "./controllers/GetLastMessageController";
import { SendMessageController } from "./controllers/SendMessageController";
import { PostgresChatRepository } from "./PostgresChatRepository";

const postgresChatRepository = new PostgresChatRepository();

export const createChatUseCase = new CreateChatUseCase(postgresChatRepository);
export const createChatController = new CreateChatController(createChatUseCase);

export const sendMessageUseCase = new SendMessageUseCase(
  postgresChatRepository
);
export const sendMessageController = new SendMessageController(
  sendMessageUseCase
);

export const getChatsUseCase = new GetChatsUseCase(postgresChatRepository);
export const getChatsController = new GetChatsController(getChatsUseCase);

export const getChatUseCase = new GetChatUseCase(postgresChatRepository);
export const getChatController = new GetChatController(getChatUseCase);

export const getLastMessageUseCase = new GetLastMessageUseCase(
  postgresChatRepository
);
export const getLastMessageController = new GetLastMessageController(
  getLastMessageUseCase
);
