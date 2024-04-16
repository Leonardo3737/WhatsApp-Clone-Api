const client = require('../wwjs')

const Chats = async() => {
  try {
    const chats = await client.getChats()    
    return chats
  } catch(err) {
    console.log(err);
  }
}

module.exports = Chats