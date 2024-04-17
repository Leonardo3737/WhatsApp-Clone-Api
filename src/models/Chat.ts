import { client } from "../wwjs";

export const Chat= async (id: string) => {
  try {
    const chat = await client.getChatById(id)
    return chat
  } catch(err) {
    console.log(err);
  }
}