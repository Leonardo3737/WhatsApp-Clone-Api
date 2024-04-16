import { Message } from 'whatsapp-web.js';
import { Http2SecureServer } from 'http2';
import { Socket } from 'socket.io';
import { corsOptions } from './corsOptions';

import { Client, LocalAuth } from "whatsapp-web.js";
const qrcode = require('qrcode-terminal');

const client = require('./wwjs');

const express = require('express');
const app = express();
const port = 5000;
const cors = require("cors")
const { createServer } = require("http");
const httpServer: Http2SecureServer = createServer(app);
const { Server } = require("socket.io");
const io = new Server(httpServer, { cors: corsOptions });
const routes = require('./routes/routes')

app.use(cors([corsOptions]))
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

