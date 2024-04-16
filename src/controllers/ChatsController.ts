
import { Chat } from "whatsapp-web.js"
import { IChats } from "../interfaces"

const Chats = require('../models/Chats')

module.exports = class ChatsController {

  static async getChats(req: any, res: any) {
    try {
      const auxChats = await Chats()      
      const chats: IChats[] = auxChats.map((c: Chat) => {
        return {
          data: {
            id: c.id._serialized,
            name: c.name,
            isGroup: c.isGroup,
            lastMessage: c.lastMessage ? {
              body: c.lastMessage.body,
              type: c.lastMessage.type,
              author: c.lastMessage.author,
            } : null,
            timestamp: c.timestamp
          }
        }
      })
      res.status(200).send(chats)
    } catch (err: any) {
      console.log(err);
      
      res.status(500).send({message: "error no servidor"})
    }
  }
}