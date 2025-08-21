import { Express } from 'express'
import { Client } from 'whatsapp-web.js'
import { ChatsController } from '../controllers/ChatsController'
import { MessagesController } from '../controllers/MessagesController'

export function startup(app: Express, client: Client) {
  const chatsController = new ChatsController(client)
  const messagesController = new MessagesController(client)

  app.get('/getChats', (req, res) => chatsController.getChats(req, res))

  app.post('/getMessages', (req, res) => messagesController.getMessages(req, res))
  app.post('/sendMessage', (req, res) => messagesController.sendMessage(req, res))
}

