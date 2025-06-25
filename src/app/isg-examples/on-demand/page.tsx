import Link from 'next/link';
import { revalidatePath, revalidateTag } from 'next/cache';

// This function runs at build time and can be revalidated
async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
    next: { 
      revalidate: 3600, // Revalidate every hour
      tags: ['post-1'] // Tag for on-demand revalidation
    }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return res.json();
}

// Server Action for on-demand revalidation
async function revalidatePost() {
  'use server';
  
  // Revalidate this specific page
  revalidatePath('/isg-examples/on-demand');
  
  // Or revalidate by tag (more specific)
  revalidateTag('post-1');
}

export default async function OnDemandISGPage() {
  const data = await getData();
  const currentTime = new Date().toLocaleTimeString();

  return (
    <div className="container mx-auto p-8">
      <Link href="/isg-examples" className="text-blue-600 hover:underline mb-4 block">
        ← Back to ISG Examples
      </Link>
      
      <h1 className="text-3xl font-bold mb-6">On-Demand ISG Example</h1>
      
      <div className="bg-green-50 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">How it works:</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Page is statically generated at build time</li>
          <li>Revalidates every hour automatically</li>
          <li>Can be manually triggered using the button below</li>
          <li>Uses tags for more granular control</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Current Data</h3>
          <div className="bg-gray-100 p-3 rounded">
            <h4 className="font-semibold">{data.title}</h4>
            <p className="text-sm text-gray-700 mt-2">{data.body}</p>
          </div>
        </div>

        <div className="border p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Page Info</h3>
          <div className="space-y-3">
            <div>
              <span className="font-semibold">Last Generated:</span>
              <p className="text-lg font-mono bg-gray-100 p-2 rounded mt-1">
                {currentTime}
              </p>
            </div>
            <div>
              <span className="font-semibold">Auto Revalidation:</span> Every hour
            </div>
            <div>
              <span className="font-semibold">Tag:</span> post-1
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Manual Revalidation</h3>
        <form action={revalidatePost}>
          <button 
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Revalidate Now
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-2">
          Click this button to manually trigger revalidation. The page will update in the background.
        </p>
      </div>

      <div className="mt-6 p-6 bg-yellow-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">On-Demand Revalidation Methods:</h3>
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold">revalidatePath()</h4>
            <p className="text-sm">Revalidates all pages under a specific path</p>
            <code className="text-xs bg-gray-100 p-1 rounded">revalidatePath('/isg-examples/on-demand')</code>
          </div>
          <div>
            <h4 className="font-semibold">revalidateTag()</h4>
            <p className="text-sm">Revalidates all pages with a specific tag</p>
            <code className="text-xs bg-gray-100 p-1 rounded">revalidateTag('post-1')</code>
          </div>
          <div>
            <h4 className="font-semibold">API Route</h4>
            <p className="text-sm">Can also be triggered via API routes</p>
            <code className="text-xs bg-gray-100 p-1 rounded">POST /api/revalidate</code>
          </div>
        </div>
      </div>

      <div className="mt-6 p-6 bg-purple-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Use Cases:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Content management systems</li>
          <li>E-commerce product updates</li>
          <li>Blog post publishing</li>
          <li>User-generated content</li>
          <li>Real-time data updates</li>
        </ul>
      </div>
    </div>
  );
} 