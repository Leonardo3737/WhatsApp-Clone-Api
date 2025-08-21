import { Client } from "whatsapp-web.js";

export const Chats = async(client: Client) => {
  try {
    const chats = await client.getChats()    
    return chats
  } catch(err) {
    console.log(err);
  }
}