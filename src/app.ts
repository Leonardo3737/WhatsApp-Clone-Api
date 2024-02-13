require('dotenv').config();
import { Chat, Message } from 'whatsapp-web.js';
import { Chats, Messages } from './interfaces/index'
import { Http2SecureServer } from 'http2';
import { Socket } from 'dgram';
import { log } from 'console';
const { Client, RemoteAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const { MongoStore } = require('wwebjs-mongo');
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
const httpServer: Http2SecureServer= createServer(app);

const io = new Server(httpServer, { cors: corsOptions });

app.use(cors([corsOptions]))
app.use(express.json());

mongoose.connect(process.env.MONGO_DB_URI).then(() => {
  const store = new MongoStore({ mongoose: mongoose });
  const client = new Client({
    authStrategy: new RemoteAuth({
      store: store,
      backupSyncIntervalMs: 300000
    })
  });

  client.on('ready', async () => {
    console.log('client is ready');
  });

  client.on('remote_session_saved', () => {
    console.log('conectado ao banco de dados');
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
    try {
      const auxChats = await client.getChats()
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
      const chat = await client.getChatById(req.body.user)
      const auxMessages = await chat.fetchMessages({ limit: 20 })
      const messages: Messages[] = auxMessages.map((m: Message) => {
        return {
          timestamp: m.timestamp,
          ack: m.ack,
          author: m.from,
          body: m.body,
          fromMe: m.fromMe
        }
      })
      res.send(messages)
    } catch (err) {
      res.send(err)
    }
  })

  io.on('connection', (socket: any) => {
    console.log('user connected');
    client.on('message_create', (message: Message) => {
      socket.emit("newMessage", message.body)   
    })
    console.log(socket.id);
    
  })

  client.initialize();
  httpServer.listen(port, () => {
    console.log('servidor rodando');
  })
});