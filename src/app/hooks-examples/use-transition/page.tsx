import { useState, useTransition } from 'react';
import Link from 'next/link';

const bigList = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);

export default function UseTransitionExample() {
  const [input, setInput] = useState('');
  const [list, setList] = useState(bigList);
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInput(value);
    startTransition(() => {
      setList(bigList.filter(item => item.toLowerCase().includes(value.toLowerCase())).slice(0, 20));
    });
  }

  return (
    <div className="container mx-auto p-8">
      <Link href="/hooks-examples" className="text-blue-600 hover:underline mb-4 block">← Back to Hooks Examples</Link>
      <h1 className="text-3xl font-bold mb-6">useTransition Example</h1>
      <p className="mb-4">This hook lets you mark state updates as transitions, keeping the UI responsive for non-urgent updates.</p>
      <input
        className="border p-2 rounded w-full max-w-md mb-4"
        placeholder="Type to filter a big list..."
        value={input}
        onChange={handleChange}
      />
      {isPending && <div className="text-blue-600 mb-2">Updating list...</div>}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="font-semibold mb-2">Filtered Results (showing 20):</h2>
        <ul className="list-disc list-inside">
          {list.map(item => <li key={item}>{item}</li>)}
        </ul>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">How it works:</h2>
        <ul className="list-disc list-inside">
          <li>Input value updates immediately</li>
          <li>List filtering is marked as a transition</li>
          <li>UI stays responsive during expensive updates</li>
        </ul>
      </div>
    </div>
  );
} 