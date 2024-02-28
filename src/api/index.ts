import { Client, LocalAuth } from "whatsapp-web.js";
const qrcode = require('qrcode-terminal');

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

export default client