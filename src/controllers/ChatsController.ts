
import { Chat, Client } from "whatsapp-web.js"
import { IChats } from "../interfaces"
import { Chats } from "../models/Chats"


export class ChatsController {

  constructor(private client: Client) {}

  async getChats(req: any, res: any) {
    try {      
      const auxChats = await Chats(this.client)
      
      const chats: IChats[] = auxChats!.map((c: Chat) => {
        return {
          id: c.id._serialized,
          name: c.name,
          isGroup: c.isGroup,
          unreadCount: c.unreadCount,
          lastMessage: c.lastMessage ? {
            body: c.lastMessage.body,
            type: c.lastMessage.type,
            author: c.lastMessage.author,
          } : null,
          timestamp: c.timestamp
        }
      })
      res.status(200).send(chats)
    } catch (err: any) {
      console.log(err);

      res.status(500).send({ message: "error no servidor" })
    }
  }
}