import express from "express";
import { MessagesController } from "../controllers/MessagesController";

export const messageRoutes = express.Router(); 

messageRoutes.post('/getMessages', MessagesController.getMessages)
messageRoutes.post('/sendMessage', MessagesController.sendMessage)