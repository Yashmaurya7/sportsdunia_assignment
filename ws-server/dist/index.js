"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 4001;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
const wss = new ws_1.WebSocketServer({ port: PORT });
wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('close', () => console.log('Client disconnected'));
});
// Endpoint to broadcast messages
app.post('/broadcast', (req, res) => {
    const message = req.body;
    wss.clients.forEach((client) => {
        if (client.readyState === ws_1.WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
    res.status(200).send('Message broadcasted');
});
app.listen(4000, () => console.log(`WebSocket Server running on ws://localhost:4000`));
