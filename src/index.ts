import { Message } from 'whatsapp-web.js';
import { Socket } from 'socket.io';
import { corsOptions } from './corsOptions';
import {client} from './wwjs';
import { routes } from './routes/routes'
import express from 'express';
import cors from "cors"
import {createServer, Server as IServe} from "http";
import {Server} from "socket.io";

const port = 5000;
const app = express();
const httpServer: IServe = createServer(app);
const io = new Server(httpServer, { cors: corsOptions });

app.use(cors(corsOptions))
app.use(express.json());
app.use('/', routes)

io.on('connection', (socket: Socket) => {
  console.log('user connected');
  client.on('message_create', async (message: Message) => {
    socket.emit("newMessage", message.body)
  })
})

httpServer.listen(port, () => {
  console.log('servidor rodando');
})

