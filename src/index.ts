import { Message } from 'whatsapp-web.js';
import { Socket } from 'socket.io';
import { corsOptions } from './corsOptions';
import express from 'express';
import cors from "cors"
import {createServer, Server as IServe} from "http";
import {Server} from "socket.io";

import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from 'qrcode-terminal';
import { startup } from './routes/routes';

const client = new Client({
  puppeteer: {
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', // Windows 
    // ou '/usr/bin/google-chrome' no Linux
    headless: true
  }
});

try {
  client.once('ready', async () => {
    console.log('client is ready');
  });

  client.on('remote_session_saved', () => {
    console.log('session saved');
  });

  client.on('qr', (qr: any) => {
    qrcode.generate(qr, { small: true });
  });
  client.initialize();

} catch (err) {
  console.log("não foi possivel inicar a sessão \n", err);
}

const port = 5000;
const app = express();
const httpServer: IServe = createServer(app);
const io = new Server(httpServer, { cors: corsOptions });

app.use(cors(corsOptions))
app.use(express.json());
app.use((req, res, next)=> {
  if(!client) {
    res.status(204).send()
    return
  }
  next()
})

startup(app, client)

io.on('connection', (socket: Socket) => {
  console.log('user connected');
  client.on('message_create', async (message: Message) => {
    socket.emit("newMessage", message.body)
  })
})

httpServer.listen(port, '192.168.100.72', () => {
  console.log('servidor rodando');
})

