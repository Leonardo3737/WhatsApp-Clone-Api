import { client } from "../wwjs";

export const Chats = async() => {
  try {
    const chats = await client.getChats()    
    return chats
  } catch(err) {
    console.log(err);
  }
}