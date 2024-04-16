import client from "../wwjs"

(async () => {
  try {
    const Chats: any = await client.getChats()
    module.exports = Chats
  } catch (err) {
    console.log(err)
  }
})()
