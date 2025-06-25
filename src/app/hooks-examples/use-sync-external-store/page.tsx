import { useSyncExternalStore } from 'react';
import Link from 'next/link';

function useWindowWidth() {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener('resize', cb);
      return () => window.removeEventListener('resize', cb);
    },
    () => window.innerWidth
  );
}

export default function UseSyncExternalStoreExample() {
  const width = useWindowWidth();
  return (
    <div className="container mx-auto p-8">
      <Link href="/hooks-examples" className="text-blue-600 hover:underline mb-4 block">← Back to Hooks Examples</Link>
      <h1 className="text-3xl font-bold mb-6">useSyncExternalStore Example</h1>
      <p className="mb-4">This hook lets you subscribe to external stores in a concurrent-safe way. Here, we subscribe to the window width.</p>
      <div className="bg-gray-100 p-6 rounded-lg text-center">
        <span className="text-lg">Current window width:</span>
        <div className="text-4xl font-mono mt-2">{width}px</div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">How it works:</h2>
        <ul className="list-disc list-inside">
          <li>Subscribes to <code>resize</code> events on the window</li>
          <li>Updates the value when the window is resized</li>
          <li>Unsubscribes automatically on cleanup</li>
        </ul>
      </div>
    </div>
  );
} 