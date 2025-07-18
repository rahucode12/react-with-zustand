'use client';
import { useState, useTransition } from 'react';
import Link from 'next/link';
import { Box, Typography, TextField, Button, Card, CardContent, CircularProgress, Paper } from '@mui/material';

const bigList = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);

export default function FiberEffectExamples() {
  // Blocking (no transition)
  const [inputBlocking, setInputBlocking] = useState('');
  const [filteredBlocking, setFilteredBlocking] = useState(bigList);

  // Concurrent (with transition)
  const [inputConcurrent, setInputConcurrent] = useState('');
  const [filteredConcurrent, setFilteredConcurrent] = useState(bigList);
  const [isPending, startTransition] = useTransition();

  // Blocking filter
  function handleBlockingChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInputBlocking(value);
    // This will block the UI for large lists
    setFilteredBlocking(
      bigList.filter(item => item.toLowerCase().includes(value.toLowerCase())).slice(0, 100)
    );
  }

  // Concurrent filter
  function handleConcurrentChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInputConcurrent(value);
    startTransition(() => {
      setFilteredConcurrent(
        bigList.filter(item => item.toLowerCase().includes(value.toLowerCase())).slice(0, 100)
      );
    });
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', p: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="h6" sx={{ color: 'blue.600', mb: 1 }}>
            ← Back to Home
          </Typography>
        </Link>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          React Fiber Effect Examples
        </Typography>
        <Typography variant="body1" sx={{ color: 'grey.600', mt: 1 }}>
          See the difference between blocking and concurrent rendering (powered by React Fiber).
        </Typography>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        {/* Blocking Example */}
        <Card>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2, color: 'red.600', fontWeight: 'bold' }}>
              Blocking Rendering (No Fiber Magic)
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Try typing fast: the UI will freeze while filtering the big list.
            </Typography>
            <TextField
              fullWidth
              size="small"
              label="Filter list (blocking)"
              value={inputBlocking}
              onChange={handleBlockingChange}
              sx={{ mb: 2 }}
            />
            <Paper sx={{ maxHeight: 300, overflow: 'auto', p: 1, bgcolor: 'grey.100' }}>
              <ul style={{ margin: 0, padding: 0 }}>
                {filteredBlocking.map(item => (
                  <li key={item} style={{ fontSize: 14 }}>{item}</li>
                ))}
              </ul>
            </Paper>
          </CardContent>
        </Card>

        {/* Concurrent Example */}
        <Card>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2, color: 'green.600', fontWeight: 'bold' }}>
              Concurrent Rendering (Fiber Magic)
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Try typing fast: the UI stays responsive, and you see a spinner while filtering.
            </Typography>
            <TextField
              fullWidth
              size="small"
              label="Filter list (concurrent)"
              value={inputConcurrent}
              onChange={handleConcurrentChange}
              sx={{ mb: 2 }}
            />
            {isPending && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <CircularProgress size={18} />
                <Typography variant="caption" color="primary">Updating list...</Typography>
              </Box>
            )}
            <Paper sx={{ maxHeight: 300, overflow: 'auto', p: 1, bgcolor: 'grey.100' }}>
              <ul style={{ margin: 0, padding: 0 }}>
                {filteredConcurrent.map(item => (
                  <li key={item} style={{ fontSize: 14 }}>{item}</li>
                ))}
              </ul>
            </Paper>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h6" sx={{ mb: 1, color: 'primary.main' }}>
          What is React Fiber?
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          React Fiber is the internal engine that enables concurrent rendering, interruptible work, and prioritization in React. It allows React to keep the UI responsive even during heavy updates.
        </Typography>
        <Typography variant="body2">
          <strong>Try both filters above:</strong> The left one blocks the UI, while the right one stays responsive thanks to Fiber and concurrent features like <code>useTransition</code>.
        </Typography>
      </Box>
    </Box>
  );
} 