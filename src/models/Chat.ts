import { Client } from "whatsapp-web.js";

export const Chat= async (id: string, client: Client) => {
  try {
    const chat = await client.getChatById(id)
    return chat
  } catch(err) {
    console.log(err);
  }
}