'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Box, 
  Typography, 
  Button, 
  TextField, 
  Card, 
  CardContent, 
  Paper, 
  List, 
  ListItem, 
  ListItemText,
  Chip,
  Divider,
  Alert,
  IconButton
} from '@mui/material';
import { 
  Send, 
  Wifi, 
  WifiOff, 
  Chat, 
  Notifications,
  Close
} from '@mui/icons-material';

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
  type: 'user' | 'system' | 'notification';
}

interface User {
  id: string;
  name: string;
  isOnline: boolean;
}

export default function WebSocketExamples() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [username, setUsername] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [notifications, setNotifications] = useState<string[]>([]);
  
  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // WebSocket connection management
  const connectWebSocket = () => {
    if (!username.trim()) {
      alert('Please enter a username first!');
      return;
    }

    setConnectionStatus('connecting');
    
    // In a real app, you'd connect to your WebSocket server
    // For demo purposes, we'll simulate WebSocket behavior
    const ws = new WebSocket('wss://echo.websocket.org'); // Echo server for testing
    
    ws.onopen = () => {
      setIsConnected(true);
      setConnectionStatus('connected');
      addSystemMessage(`Connected to WebSocket server`);
      
      // Simulate user joining
      setTimeout(() => {
        addSystemMessage(`${username} joined the chat`);
        addNotification(`${username} joined the chat`);
      }, 500);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        handleIncomingMessage(data);
      } catch (error) {
        // Echo server just echoes back the message
        addUserMessage(event.data, 'Echo Server');
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
      setConnectionStatus('disconnected');
      addSystemMessage('Disconnected from WebSocket server');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      addSystemMessage('WebSocket connection error');
    };

    wsRef.current = ws;
  };

  const disconnectWebSocket = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  };

  const sendMessage = () => {
    if (!inputMessage.trim() || !isConnected) return;

    const message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: username,
      timestamp: new Date(),
      type: 'user' as const
    };

    // Send to WebSocket server
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    }

    // Add to local messages
    setMessages(prev => [...prev, message]);
    setInputMessage('');
  };

  const handleIncomingMessage = (data: any) => {
    const message: Message = {
      id: data.id || Date.now().toString(),
      text: data.text,
      sender: data.sender,
      timestamp: new Date(data.timestamp || Date.now()),
      type: data.type || 'user'
    };

    setMessages(prev => [...prev, message]);
  };

  const addSystemMessage = (text: string) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      sender: 'System',
      timestamp: new Date(),
      type: 'system'
    };
    setMessages(prev => [...prev, message]);
  };

  const addUserMessage = (text: string, sender: string) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      type: 'user'
    };
    setMessages(prev => [...prev, message]);
  };

  const addNotification = (text: string) => {
    setNotifications(prev => [...prev, text]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n !== text));
    }, 5000);
  };

  // Simulate real-time updates
  useEffect(() => {
    if (isConnected) {
      const interval = setInterval(() => {
        // Simulate random user activity
        const randomUsers = ['Alice', 'Bob', 'Charlie', 'Diana'];
        const randomUser = randomUsers[Math.floor(Math.random() * randomUsers.length)];
        const randomMessages = [
          'Hello everyone!',
          'How is everyone doing?',
          'Great discussion!',
          'Thanks for sharing!',
          'I agree with that point.'
        ];
        const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
        
        if (Math.random() < 0.3) { // 30% chance of message
          addUserMessage(randomMessage, randomUser);
        }
      }, 10000); // Every 10 seconds

      return () => clearInterval(interval);
    }
  }, [isConnected]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', p: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="h6" sx={{ color: 'blue.600', mb: 1 }}>
            ← Back to Home
          </Typography>
        </Link>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          WebSocket Examples
        </Typography>
        <Typography variant="body1" sx={{ color: 'grey.600', mt: 1 }}>
          Real-time communication with WebSocket API
        </Typography>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 300px' }, gap: 3 }}>
        {/* Main Chat Area */}
        <Card sx={{ height: '70vh' }}>
          <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chat />
                Real-time Chat
              </Typography>
              <Chip 
                icon={isConnected ? <Wifi /> : <WifiOff />}
                label={connectionStatus}
                color={isConnected ? 'success' : 'error'}
                size="small"
              />
            </Box>

            {/* Connection Setup */}
            {!isConnected && (
              <Paper sx={{ p: 2, mb: 2, bgcolor: 'blue.50' }}>
                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                  Connect to start chatting:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <TextField
                    size="small"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{ flex: 1 }}
                  />
                  <Button 
                    variant="contained" 
                    onClick={connectWebSocket}
                    disabled={connectionStatus === 'connecting'}
                  >
                    Connect
                  </Button>
                </Box>
                <Alert severity="info" sx={{ fontSize: '0.875rem' }}>
                  This demo uses a public echo server. In production, connect to your own WebSocket server.
                </Alert>
              </Paper>
            )}

            {/* Messages */}
            <Paper 
              sx={{ 
                flex: 1, 
                overflow: 'auto', 
                p: 2, 
                mb: 2,
                bgcolor: 'grey.50',
                maxHeight: '400px'
              }}
            >
              <List sx={{ p: 0 }}>
                {messages.map((message) => (
                  <ListItem key={message.id} sx={{ px: 0, py: 0.5 }}>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontWeight: 'bold',
                              color: message.type === 'system' ? 'orange.600' : 'primary.main'
                            }}
                          >
                            {message.sender}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'grey.500' }}>
                            {message.timestamp.toLocaleTimeString()}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: message.type === 'system' ? 'orange.700' : 'inherit',
                            fontStyle: message.type === 'system' ? 'italic' : 'normal'
                          }}
                        >
                          {message.text}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
                <div ref={messagesEndRef} />
              </List>
            </Paper>

            {/* Message Input */}
            {isConnected && (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button 
                  variant="contained" 
                  onClick={sendMessage}
                  disabled={!inputMessage.trim()}
                  endIcon={<Send />}
                >
                  Send
                </Button>
              </Box>
            )}

            {/* Disconnect Button */}
            {isConnected && (
              <Button 
                variant="outlined" 
                color="error" 
                onClick={disconnectWebSocket}
                sx={{ mt: 2 }}
              >
                Disconnect
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Sidebar */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Notifications */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Notifications />
                Notifications
              </Typography>
              <Box sx={{ maxHeight: '200px', overflow: 'auto' }}>
                {notifications.length === 0 ? (
                  <Typography variant="body2" sx={{ color: 'grey.500', fontStyle: 'italic' }}>
                    No notifications
                  </Typography>
                ) : (
                  notifications.map((notification, index) => (
                    <Alert 
                      key={index} 
                      severity="info" 
                      sx={{ mb: 1, fontSize: '0.875rem' }}
                      action={
                        <IconButton
                          size="small"
                          onClick={() => setNotifications(prev => prev.filter((_, i) => i !== index))}
                        >
                          <Close fontSize="small" />
                        </IconButton>
                      }
                    >
                      {notification}
                    </Alert>
                  ))
                )}
              </Box>
            </CardContent>
          </Card>

          {/* WebSocket Info */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                WebSocket Info
              </Typography>
              <Box sx={{ spaceY: 1 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Status:</strong> {connectionStatus}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Messages:</strong> {messages.length}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Username:</strong> {username || 'Not set'}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Code Example */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Quick Code Example
              </Typography>
              <Paper sx={{ p: 2, bgcolor: 'grey.100', fontSize: '0.875rem' }}>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
{`// Connect to WebSocket
const ws = new WebSocket('ws://localhost:3001');

// Send message
ws.send(JSON.stringify({
  type: 'message',
  text: 'Hello!'
}));

// Listen for messages
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received:', data);
};`}
                </pre>
              </Paper>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
} 