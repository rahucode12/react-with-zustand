import { useId } from 'react';
import Link from 'next/link';

export default function UseIdExample() {
  const id = useId();
  return (
    <div className="container mx-auto p-8">
      <Link href="/hooks-examples" className="text-blue-600 hover:underline mb-4 block">← Back to Hooks Examples</Link>
      <h1 className="text-3xl font-bold mb-6">useId Example</h1>
      <p className="mb-4">This hook generates unique IDs that are stable across server and client. Useful for accessibility and forms.</p>
      <form className="bg-gray-100 p-6 rounded-lg max-w-md">
        <label htmlFor={id} className="block mb-2 font-semibold">Your Name</label>
        <input id={id} className="border p-2 rounded w-full" placeholder="Enter your name..." />
      </form>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">How it works:</h2>
        <ul className="list-disc list-inside">
          <li>Generates a unique ID for each component instance</li>
          <li>Ensures accessibility for form fields</li>
        </ul>
      </div>
    </div>
  );
} 