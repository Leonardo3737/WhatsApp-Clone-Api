import { Chat as IChat, Message } from "whatsapp-web.js"
import { IMessages } from "../interfaces"
import { Messages } from "../models/Messages"
import { Chats } from "../models/Chats"
import { client } from "../wwjs"
import { Chat } from "../models/Chat"

export class MessagesController {

  static async getMessages (req: any, res: any) { 
    try {
      const chat = await Chat(req.body.user)
      const auxMessages = await Messages(req.body.user)
      const chats: IChat[] | undefined = await Chats()
      const messages: IMessages[] | undefined = auxMessages?.map((m: Message) => {
        let aux: any = chats ? chats.find((c: IChat) => c.id._serialized === m.author) : m.author
        return {
          timestamp: m.timestamp,
          ack: m.ack,
          author: aux ? aux.name : m.author,
          body: m.body,
          fromMe: m.fromMe
        }
      })
      res.status(200).send([{isGroup: chat?.isGroup}, messages])
    } catch(err) {
      console.log(err);      
      res.status(500).send("Error no Servidor.")
    }
  }

  static async sendMessage(req:any, res:any) {
    try {
      const to = req.body.to, message = req.body.message
      await client.sendMessage(to, message)
      res.status(200).send('success')
    } catch (err) {
      console.log(err);      
      res.status(500).send('Erro no Servidor.');
    }
  }
}