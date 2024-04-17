import { ChatsController } from "../controllers/ChatsController";

import express from 'express';
export const chatRoutes = express.Router();

chatRoutes.get('/getChats', ChatsController.getChats)