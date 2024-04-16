import { Chat as IChat } from "whatsapp-web.js"
const client = require('../wwjs')

const Chat = require('./Chat')

const Messages = async (id: string) => {
  try {
    const chat: IChat = await Chat(id)
    return chat.fetchMessages({ limit: 40 })
  } catch(err) {
    console.log(err);
  }
}

module.exports = Messages