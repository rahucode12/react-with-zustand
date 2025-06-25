import Link from 'next/link';

// This function generates static params at build time
export async function generateStaticParams() {
  // Generate pages for IDs 1-5 at build time
  const posts = Array.from({ length: 5 }, (_, i) => ({ id: (i + 1).toString() }));
  
  return posts.map((post) => ({
    id: post.id,
  }));
}

// This function runs at build time and can be revalidated
async function getPost(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: { revalidate: 30 } // Revalidate every 30 seconds
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }
  
  return res.json();
}

interface PageProps {
  params: {
    id: string;
  };
}

export default async function DynamicRouteISGPage({ params }: PageProps) {
  const post = await getPost(params.id);
  const currentTime = new Date().toLocaleTimeString();

  return (
    <div className="container mx-auto p-8">
      <Link href="/isg-examples" className="text-blue-600 hover:underline mb-4 block">
        ← Back to ISG Examples
      </Link>
      
      <h1 className="text-3xl font-bold mb-6">Dynamic Route ISG Example</h1>
      
      <div className="bg-green-50 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">How it works:</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Pages for IDs 1-5 are pre-generated at build time</li>
          <li>Each page revalidates every 30 seconds</li>
          <li>Dynamic routes with ISG provide the best of both worlds</li>
          <li>Fast loading for known routes, background updates for fresh content</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Post Details</h3>
          <div className="space-y-3">
            <div>
              <span className="font-semibold">ID:</span> {post.id}
            </div>
            <div>
              <span className="font-semibold">Title:</span> {post.title}
            </div>
            <div>
              <span className="font-semibold">Body:</span> {post.body}
            </div>
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
              <span className="font-semibold">Revalidation:</span> Every 30 seconds
            </div>
            <div>
              <span className="font-semibold">Route:</span> /isg-examples/dynamic-routes/{params.id}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Navigation</h3>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((id) => (
            <Link
              key={id}
              href={`/isg-examples/dynamic-routes/${id}`}
              className={`px-4 py-2 rounded ${
                params.id === id.toString()
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Post {id}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-6 p-6 bg-yellow-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Key Concepts:</h3>
        <div className="space-y-2">
          <p><strong>generateStaticParams</strong> - Pre-generates pages for specific IDs at build time</p>
          <p><strong>Dynamic Routes</strong> - Each [id] gets its own static page</p>
          <p><strong>ISG</strong> - Each page can be revalidated independently</p>
          <p><strong>Performance</strong> - Known routes are instantly available, unknown routes fall back to SSR</p>
        </div>
      </div>
    </div>
  );
} 