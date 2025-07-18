import Image from "next/image";
import styles from "./page.module.css";
import { Counter } from "./_component/Counter";
import { Users } from "./_component/Users";
import { AgeComponent } from "./_component/AgeComponent";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <Box margin="100px 300px 300px 300px"
      justifyContent={"center"}>
      <Typography>
        <h2>Zustand Re-render issue</h2>
      </Typography>

      <Box
        display="flex"
        gap={4}
      >
        <Users />
        <AgeComponent />
      </Box>

      <Box marginTop={4}>
        <Link href="/isg-examples" style={{ color: '#1976d2', textDecoration: 'underline' }}>
          🚀 Learn ISG (Incremental Static Regeneration) in Next.js 15
        </Link>
      </Box>

      <Box marginTop={2}>
        <Link href="/hooks-examples" style={{ color: '#388e3c', textDecoration: 'underline' }}>
          🧩 Explore Latest React Hooks (18/19+) Practical Examples
        </Link>
      </Box>

      <Box marginTop={2}>
        <Link href="/hooks-examples/virtualization" className="text-blue-600 hover:underline">
          Virtualization Example
        </Link>
      </Box>

      <Box marginTop={2}>
        <Link href="/css-position-examples" style={{ color: '#ff6b35', textDecoration: 'underline' }}>
          🎯 Master CSS Position Properties - Complete Guide with Examples
        </Link>
      </Box>

      <Box marginTop={2}>
        <Link href="/websocket-examples" style={{ color: '#9c27b0', textDecoration: 'underline' }}>
          🔌 WebSocket Examples - Real-time Communication Demo
        </Link>
      </Box>

      <Box marginTop={2}>
        <Link href="/fiber-effect-examples" style={{ color: '#00bcd4', textDecoration: 'underline' }}>
          ⚡ React Fiber Effect Examples - See Concurrent Rendering in Action
        </Link>
      </Box>
      <Box marginTop={2}>
        <Link href="/java-script-topics" style={{ color: '#00bcd4', textDecoration: 'underline' }}>
        JS Topics
        </Link>
      </Box>
      <Box marginTop={2}>
        <Link href="/mui-table-demo" style={{ color: '#00bcd4', textDecoration: 'underline' }}>
       Dynamic Table
        </Link>
      </Box>

    </Box>

  );
}
