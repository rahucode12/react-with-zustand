import Link from 'next/link';

// This function runs at build time and can be revalidated
async function getData() {
  // Simulate API call
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
    next: { revalidate: 10 } // Revalidate every 10 seconds
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return res.json();
}

export default async function BasicISGPage() {
  const data = await getData();
  const currentTime = new Date().toLocaleTimeString();

  return (
    <div className="container mx-auto p-8">
      <Link href="/isg-examples" className="text-blue-600 hover:underline mb-4 block">
        ← Back to ISG Examples
      </Link>
      
      <h1 className="text-3xl font-bold mb-6">Basic ISG Example</h1>
      
      <div className="bg-green-50 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">How it works:</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>This page is statically generated at build time</li>
          <li>It revalidates every 10 seconds (check the timestamp below)</li>
          <li>First visit: static page served instantly</li>
          <li>Subsequent visits: page regenerates in background if stale</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Current Time (Last Generated)</h3>
          <p className="text-2xl font-mono bg-gray-100 p-3 rounded">
            {currentTime}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            This timestamp shows when the page was last generated
          </p>
        </div>

        <div className="border p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">API Data (Revalidates every 10s)</h3>
          <div className="bg-gray-100 p-3 rounded">
            <h4 className="font-semibold">{data.title}</h4>
            <p className="text-sm text-gray-700 mt-2">{data.body}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Key Points:</h3>
        <div className="space-y-2">
          <p><strong>revalidate: 10</strong> - Page regenerates every 10 seconds</p>
          <p><strong>Build Time</strong> - Page is pre-rendered at build time</p>
          <p><strong>Background Updates</strong> - Updates happen in background, user gets stale content until new version is ready</p>
          <p><strong>Performance</strong> - Fast initial load, no server-side rendering on each request</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Try this:</h3>
        <ol className="list-decimal list-inside space-y-1">
          <li>Refresh this page multiple times</li>
          <li>Wait 10+ seconds and refresh again</li>
          <li>Notice the timestamp changes after the revalidation period</li>
        </ol>
      </div>
    </div>
  );
} 