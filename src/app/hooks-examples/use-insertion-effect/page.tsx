import { useInsertionEffect, useRef } from 'react';
import Link from 'next/link';

export default function UseInsertionEffectExample() {
  const ref = useRef<HTMLDivElement>(null);

  useInsertionEffect(() => {
    const style = document.createElement('style');
    style.textContent = '.insertion-effect-demo { color: #fff; background: #1976d2; padding: 8px 16px; border-radius: 6px; }';
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="container mx-auto p-8">
      <Link href="/hooks-examples" className="text-blue-600 hover:underline mb-4 block">← Back to Hooks Examples</Link>
      <h1 className="text-3xl font-bold mb-6">useInsertionEffect Example</h1>
      <p className="mb-4">This hook lets you inject styles into the DOM before layout and paint. Useful for CSS-in-JS libraries.</p>
      <div ref={ref} className="insertion-effect-demo text-lg mt-6">Styled by <code>useInsertionEffect</code>!</div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">How it works:</h2>
        <ul className="list-disc list-inside">
          <li>Injects a style tag into the document head before paint</li>
          <li>Removes the style tag on cleanup</li>
        </ul>
      </div>
    </div>
  );
} 