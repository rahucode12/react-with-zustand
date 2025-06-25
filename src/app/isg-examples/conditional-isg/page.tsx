import Link from 'next/link';

// Simulate different types of content with different update frequencies
async function getContent() {
  // Simulate fetching content with different update patterns
  const [breakingNews, regularNews, staticContent] = await Promise.all([
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
      next: { revalidate: 60 } // Breaking news: update every minute
    }),
    fetch('https://jsonplaceholder.typicode.com/posts/2', {
      next: { revalidate: 3600 } // Regular news: update every hour
    }),
    fetch('https://jsonplaceholder.typicode.com/posts/3', {
      next: { revalidate: 86400 } // Static content: update daily
    })
  ]);

  return {
    breakingNews: await breakingNews.json(),
    regularNews: await regularNews.json(),
    staticContent: await staticContent.json(),
    lastUpdated: new Date().toLocaleTimeString()
  };
}

// Function to determine revalidation strategy based on content type
function getRevalidationStrategy(contentType: string) {
  switch (contentType) {
    case 'breaking':
      return { interval: 60, description: 'Every minute' };
    case 'regular':
      return { interval: 3600, description: 'Every hour' };
    case 'static':
      return { interval: 86400, description: 'Daily' };
    default:
      return { interval: 3600, description: 'Default: Every hour' };
  }
}

export default async function ConditionalISGPage() {
  const content = await getContent();

  return (
    <div className="container mx-auto p-8">
      <Link href="/isg-examples" className="text-blue-600 hover:underline mb-4 block">
        ← Back to ISG Examples
      </Link>
      
      <h1 className="text-3xl font-bold mb-6">Conditional ISG Example</h1>
      
      <div className="bg-green-50 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">How it works:</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Different content types use different revalidation strategies</li>
          <li>Breaking news updates every minute</li>
          <li>Regular news updates every hour</li>
          <li>Static content updates daily</li>
          <li>Strategy is determined by content type and importance</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="border p-6 rounded-lg bg-red-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Breaking News</h3>
            <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">LIVE</span>
          </div>
          <div className="bg-white p-3 rounded mb-3">
            <h4 className="font-semibold">{content.breakingNews.title}</h4>
            <p className="text-sm text-gray-700 mt-2">{content.breakingNews.body}</p>
          </div>
          <div className="text-sm text-gray-600">
            <strong>Revalidation:</strong> {getRevalidationStrategy('breaking').description}
          </div>
        </div>

        <div className="border p-6 rounded-lg bg-blue-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Regular News</h3>
            <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">HOURLY</span>
          </div>
          <div className="bg-white p-3 rounded mb-3">
            <h4 className="font-semibold">{content.regularNews.title}</h4>
            <p className="text-sm text-gray-700 mt-2">{content.regularNews.body}</p>
          </div>
          <div className="text-sm text-gray-600">
            <strong>Revalidation:</strong> {getRevalidationStrategy('regular').description}
          </div>
        </div>

        <div className="border p-6 rounded-lg bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Static Content</h3>
            <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">DAILY</span>
          </div>
          <div className="bg-white p-3 rounded mb-3">
            <h4 className="font-semibold">{content.staticContent.title}</h4>
            <p className="text-sm text-gray-700 mt-2">{content.staticContent.body}</p>
          </div>
          <div className="text-sm text-gray-600">
            <strong>Revalidation:</strong> {getRevalidationStrategy('static').description}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Page Info</h3>
          <div className="space-y-3">
            <div>
              <span className="font-semibold">Last Updated:</span>
              <p className="text-lg font-mono bg-gray-100 p-2 rounded mt-1">
                {content.lastUpdated}
              </p>
            </div>
            <div>
              <span className="font-semibold">Content Types:</span> 3 different strategies
            </div>
          </div>
        </div>

        <div className="border p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Revalidation Strategies</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Breaking News:</span>
              <span className="bg-red-100 px-2 py-1 rounded text-sm">60s</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Regular News:</span>
              <span className="bg-blue-100 px-2 py-1 rounded text-sm">1h</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Static Content:</span>
              <span className="bg-gray-100 px-2 py-1 rounded text-sm">24h</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-yellow-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Conditional ISG Patterns:</h3>
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold">Content-Based Strategy</h4>
            <p className="text-sm">Different content types get different revalidation intervals</p>
          </div>
          <div>
            <h4 className="font-semibold">Time-Based Strategy</h4>
            <p className="text-sm">Revalidation frequency based on time of day or day of week</p>
          </div>
          <div>
            <h4 className="font-semibold">User-Based Strategy</h4>
            <p className="text-sm">Different strategies for different user types or regions</p>
          </div>
          <div>
            <h4 className="font-semibold">Event-Based Strategy</h4>
            <p className="text-sm">Revalidation triggered by specific events or conditions</p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-6 bg-purple-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Best Practices:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Use shorter intervals for frequently changing content</li>
          <li>Use longer intervals for stable content to reduce server load</li>
          <li>Consider user behavior patterns when setting intervals</li>
          <li>Monitor performance and adjust strategies accordingly</li>
          <li>Use tags for more granular control over revalidation</li>
        </ul>
      </div>
    </div>
  );
} 