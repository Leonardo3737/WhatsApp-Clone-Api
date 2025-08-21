import { Client, Chat as IChat, Message } from "whatsapp-web.js"
import { IMessages } from "../interfaces"
import { Messages } from "../models/Messages"
import { Chats } from "../models/Chats"
import { Chat } from "../models/Chat"

export class MessagesController {

  constructor(private client: Client) {}

  async getMessages (req: any, res: any) { 
    try {
      const chat = await Chat(req.body.user, this.client)
      const auxMessages = await Messages(req.body.user, this.client)
      const chats: IChat[] | undefined = await Chats(this.client)
      const messages: IMessages[] | undefined = auxMessages?.map((m: Message) => {
        let aux: any = chats ? chats.find((c: IChat) => c.id._serialized === m.author) : m.author
        return {
          timestamp: m.timestamp,
          ack: m.ack,
          author: aux ? aux.name : m.author,
          body: m.body,
          fromMe: m.fromMe,
          type: m.type
        }
      })
      res.status(200).send({isGroup: chat?.isGroup, messages})
    } catch(err) {
      console.log(err);      
      res.status(500).send("Error no Servidor.")
    }
  }

  async sendMessage(req:any, res:any) {
    try {
      const to = req.body.to, message = req.body.message
      await this.client.sendMessage(to, message)
      res.status(200).send('success')
    } catch (err) {
      console.log(err);      
      res.status(500).send('Erro no Servidor.');
    }
  }
}