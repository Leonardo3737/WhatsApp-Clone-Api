// import { Chat, Message } from "whatsapp-web.js"
// import { IMessages } from "../interfaces"

const Messages = require('../models/Messages')

module.exports = class MessgesController {

  static async getMessages (req: any, res: any) {
    try {
      // const messages = await Messages(req.body.user)
      // const chats: Chat[] = await Chats
      // const auxMessages: IMessages[] = messages.map((m: Message) => {
      //   let aux: any = chats ? chats.find((c: Chat) => c.id._serialized === m.author) : m.author
      //   return {
      //     timestamp: m.timestamp,
      //     ack: m.ack,
      //     author: aux ? aux.name : m.author,
      //     body: m.body,
      //     fromMe: m.fromMe
      //   }
      // })
      res.send('auxMessages', 200)
    } catch(err) {
      res.send("Error no Servidor.", 500)
    }
  }

  static async sendMessage(req:any, res:any) {
    try {
      // const to = req.body.to, message = req.body.message
      // await client.sendMessage(to, message)
      res.send('success', 200)
    } catch (err) {
      console.log('Erro no Servidor.', 500);
    }
  }
  
}