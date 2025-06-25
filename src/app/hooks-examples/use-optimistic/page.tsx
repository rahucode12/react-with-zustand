// @ts-nocheck
import { useOptimistic, useState } from 'react';
import Link from 'next/link';

export default function UseOptimisticExample() {
  const [comments, setComments] = useState([
    { id: 1, text: 'This is great!' },
    { id: 2, text: 'Love this example.' },
  ]);
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (state, newComment) => [...state, newComment]
  );
  const [input, setInput] = useState('');

  async function handleAdd(e) {
    e.preventDefault();
    if (!input.trim()) return;
    addOptimisticComment({ id: Date.now(), text: input });
    setInput('');
    // Simulate server delay
    setTimeout(() => {
      setComments((prev) => [...prev, { id: Date.now(), text: input }]);
    }, 1000);
  }

  return (
    <div className="container mx-auto p-8">
      <Link href="/hooks-examples" className="text-blue-600 hover:underline mb-4 block">← Back to Hooks Examples</Link>
      <h1 className="text-3xl font-bold mb-6">useOptimistic Example (React 19+)</h1>
      <p className="mb-4">This hook lets you show optimistic UI updates before the server confirms the change.</p>
      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <input
          className="border p-2 rounded flex-1"
          placeholder="Add a comment..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
      </form>
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="font-semibold mb-2">Comments (optimistic):</h2>
        <ul className="list-disc list-inside">
          {optimisticComments.map(c => <li key={c.id}>{c.text}</li>)}
        </ul>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">How it works:</h2>
        <ul className="list-disc list-inside">
          <li>Shows new comment instantly (optimistic update)</li>
          <li>Updates real state after server confirms</li>
        </ul>
      </div>
    </div>
  );
} 