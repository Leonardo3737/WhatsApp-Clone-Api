import { Client, Chat as IChat } from "whatsapp-web.js"
import { Chat } from "./Chat";

export const Messages = async (id: string, client: Client) => {
  try {
    const chat: IChat | undefined = await Chat(id, client)
    return chat?.fetchMessages({ limit: 40 })
  } catch(err) {
    console.log(err);
  }
}