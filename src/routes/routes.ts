import express from 'express'
import { messageRoutes } from "./MessagesRoutes"
import { chatRoutes } from "./chatsRoutes"

export const routes = express.Router()

routes.use('', chatRoutes)
routes.use('', messageRoutes)
