import { Chat as IChat } from "whatsapp-web.js"
import { Chat } from "./Chat";

export const Messages = async (id: string) => {
  try {
    const chat: IChat | undefined = await Chat(id)
    return chat?.fetchMessages({ limit: 40 })
  } catch(err) {
    console.log(err);
  }
}