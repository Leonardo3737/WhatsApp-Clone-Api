import { Client, LocalAuth } from "whatsapp-web.js";
const qrcode = require('qrcode-terminal');

const client = new Client({
  webVersionCache: {
    type: "remote",
    remotePath:
      "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
  },
  authStrategy: new LocalAuth()
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

module.exports = client