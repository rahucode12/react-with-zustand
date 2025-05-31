'use client';

import { Box, Typography, Button, Stack } from '@mui/material';
import { useCounterStore } from '@/store/counterStore';

export const Counter = () => {
  const { count, increment, decrement } = useCounterStore();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      p={4}
      gap={4}
    >
      <Typography variant="h4" fontWeight="bold">
        Zustand Counter
      </Typography>

      <Typography variant="h6">
        Count: {count}
      </Typography>

      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="success" onClick={increment}>
          +
        </Button>
        <Button variant="contained" color="error" onClick={decrement}>
          -
        </Button>
      </Stack>
    </Box>
  );
}