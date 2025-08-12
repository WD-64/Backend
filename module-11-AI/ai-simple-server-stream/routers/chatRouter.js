import { Router } from 'express';
import validateZod from '../middlewares/validateZod.js';
import { userMessageSchema } from '../zod/schemas.js';
import { createSimpleChat, createChat, getChatHistory } from '../controllers/chats.js';

const chatRouter = Router();

chatRouter.post('/simple', validateZod(userMessageSchema), createSimpleChat);
chatRouter.post('/', validateZod(userMessageSchema), createChat);
chatRouter.get('/:id', getChatHistory);

export default chatRouter;
