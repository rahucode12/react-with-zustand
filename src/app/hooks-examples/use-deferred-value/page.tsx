import { useState, useDeferredValue } from 'react';
import Link from 'next/link';

const bigList = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);

export default function UseDeferredValueExample() {
  const [input, setInput] = useState('');
  const deferredInput = useDeferredValue(input);
  const filtered = bigList.filter(item => item.toLowerCase().includes(deferredInput.toLowerCase())).slice(0, 20);

  return (
    <div className="container mx-auto p-8">
      <Link href="/hooks-examples" className="text-blue-600 hover:underline mb-4 block">← Back to Hooks Examples</Link>
      <h1 className="text-3xl font-bold mb-6">useDeferredValue Example</h1>
      <p className="mb-4">This hook lets you defer updates to a value, keeping the UI responsive during expensive renders.</p>
      <input
        className="border p-2 rounded w-full max-w-md mb-4"
        placeholder="Type to filter a big list..."
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="font-semibold mb-2">Filtered Results (showing 20):</h2>
        <ul className="list-disc list-inside">
          {filtered.map(item => <li key={item}>{item}</li>)}
        </ul>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">How it works:</h2>
        <ul className="list-disc list-inside">
          <li>Input value is deferred for filtering</li>
          <li>UI stays responsive even with a large list</li>
        </ul>
      </div>
    </div>
  );
} 