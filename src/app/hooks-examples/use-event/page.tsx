'use client';
// @ts-nocheck
import { useState, useEvent } from 'react';
import Link from 'next/link';

export default function UseEventExample() {
  const [count, setCount] = useState(0);
  const [log, setLog] = useState([]);

  const handleClick = useEvent(() => {
    setCount((c) => c + 1);
    setLog((l) => [...l, `Clicked at ${new Date().toLocaleTimeString()}`]);
  });

  return (
    <div className="container mx-auto p-8">
      <Link href="/hooks-examples" className="text-blue-600 hover:underline mb-4 block">← Back to Hooks Examples</Link>
      <h1 className="text-3xl font-bold mb-6">useEvent Example (React 19+)</h1>
      <p className="mb-4">This hook provides a stable event callback that always has the latest closure but doesn't change on every render.</p>
      <button onClick={handleClick} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">Click me</button>
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="font-semibold mb-2">Count: {count}</h2>
        <ul className="list-disc list-inside">
          {log.map((entry, i) => <li key={i}>{entry}</li>)}
        </ul>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">How it works:</h2>
        <ul className="list-disc list-inside">
          <li>Callback reference is stable across renders</li>
          <li>Always has access to the latest state</li>
        </ul>
      </div>
    </div>
  );
} 