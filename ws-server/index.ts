import express from 'express';
import { WebSocketServer, WebSocket } from 'ws';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

const wss = new WebSocketServer({ port: PORT });

wss.on('connection', (ws: WebSocket) => {
  console.log('Client connected');

  ws.on('close', () => console.log('Client disconnected'));
});

// Endpoint to broadcast messages
app.post('/broadcast', (req, res) => {
  const message = req.body;

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });

  res.status(200).send('Message broadcasted');
});

app.listen(4000, () => console.log(`WebSocket Server running on ws://localhost:4000`));
