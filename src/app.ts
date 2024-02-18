import { Chat, LocalAuth, Message } from 'whatsapp-web.js';
import { Chats, Messages } from './interfaces/index'
import { Http2SecureServer } from 'http2';
import { Socket } from 'socket.io';
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const mongoose = require('mongoose');

const express = require('express');
const app = express();
const port = 5000;
const cors = require("cors")
const corsOptions = {
  origin: "http://localhost:3000",
  allowedHeaders: [
    { key: 'Access-Control-Allow-Credentials', value: 'true' },
    { key: 'Access-Control-Allow-Origin', value: '*' },
    { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
    { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-requested-With' }],
  credentials: true
}

const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer: Http2SecureServer = createServer(app);

const io = new Server(httpServer, { cors: corsOptions });

app.use(cors([corsOptions]))
app.use(express.json());
const client = new Client({
  authStrategy: new LocalAuth()
});

client.on('ready', async () => {
  console.log('client is ready');
});

client.on('remote_session_saved', () => {
  console.log('session saved');
});

client.on('qr', (qr: any) => {
  qrcode.generate(qr, { small: true });
});

app.post('/sendMessage', async (req: any, res: any) => {
  try {
    const to = req.body.to, message = req.body.message
    await client.sendMessage(to, message)
    res.send('success')
  } catch (err) {
    console.log(err);
    res.send(err)
  }
})


app.get('/getChats', async (req: any, res: any) => {
  const auxChats = await client.getChats()
  try {
    const chats: Chats[] = auxChats.map((c: Chat) => {
      return {
        id: c.id._serialized,
        name: c.name,
        isGroup: c.isGroup,
        lastMessage: c.lastMessage ? {
          body: c.lastMessage.body,
          type: c.lastMessage.type,
          author: c.lastMessage.author,
        } : null,
        timestamp: c.timestamp
      }
    })
    res.send(chats)
  } catch (err) {
    console.log(err);
    res.send(err)
  }
})

app.post('/getMessages', async (req: any, res: any) => {
  try {
    let auxChats: Chat[] | null = null
    const chat:Chat = await client.getChatById(req.body.user)
    if(chat.isGroup){
      auxChats = await client.getChats()
    }
    const auxMessages = await chat.fetchMessages({ limit: 20 })
    const messages: Messages[] = auxMessages.map((m: Message) => {
      let aux: any = auxChats ? auxChats.find((c:Chat)=> c.id._serialized === m.author) : m.author
      return {
        timestamp: m.timestamp,
        ack: m.ack,
        author: aux ? aux.name : m.author,
        body: m.body,
        fromMe: m.fromMe
      }
    })
    res.send([{isGroup: chat.isGroup}, messages])
  } catch (err) {
    res.send(err)
  }
})

io.on('connection', (socket: Socket) => {
  console.log('user connected');
  client.on('message_create', (message: Message) => {
    socket.emit("newMessage", message.body)
  })
})

client.initialize();
httpServer.listen(port, () => {
  console.log('servidor rodando');
})