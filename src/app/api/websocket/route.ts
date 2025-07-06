import { NextRequest } from 'next/server';

// Note: This is a demonstration of WebSocket concepts
// In a real Next.js app, you'd typically use Socket.io or a separate WebSocket server
// Next.js API routes don't support WebSocket upgrades directly

export async function GET(request: NextRequest) {
  return new Response(JSON.stringify({
    message: 'WebSocket endpoint',
    note: 'This is a demonstration. In production, use Socket.io or a dedicated WebSocket server.',
    example: {
      client: `
// Client-side WebSocket connection
const ws = new WebSocket('ws://localhost:3001');

ws.onopen = () => {
  console.log('Connected to WebSocket server');
  ws.send(JSON.stringify({ type: 'join', username: 'User' }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received:', data);
};

ws.onclose = () => {
  console.log('Disconnected from WebSocket server');
};
      `,
      server: `
// Server-side WebSocket handling (Node.js + ws library)
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3001 });

wss.on('connection', (ws) => {
  console.log('Client connected');
  
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    
    // Broadcast to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: 'message',
          data: data,
          timestamp: new Date().toISOString()
        }));
      }
    });
  });
  
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
      `
    }
  }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  // Simulate WebSocket message handling
  return new Response(JSON.stringify({
    success: true,
    message: 'Message received (simulated)',
    data: body,
    timestamp: new Date().toISOString()
  }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
} 