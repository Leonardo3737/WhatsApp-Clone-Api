const client = require('../wwjs')

const Chat= async (id: string) => {
  try {
    const chat = await client.getChatById(id)
    return chat
  } catch(err) {
    console.log(err);
  }
}

module.exports = Chat