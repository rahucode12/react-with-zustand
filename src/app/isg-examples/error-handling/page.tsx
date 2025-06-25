import Link from 'next/link';

// Function that might fail
async function getData() {
  try {
    // Simulate a potentially failing API call
    const random = Math.random();
    
    if (random < 0.3) {
      throw new Error('API temporarily unavailable');
    }
    
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
      next: { revalidate: 60 }
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    return { data: await res.json(), error: null };
  } catch (error) {
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

// Function with fallback data
async function getDataWithFallback() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/999', {
      next: { revalidate: 60 }
    });
    
    if (!res.ok) {
      // Return fallback data instead of throwing
      return {
        id: 999,
        title: 'Fallback Title (API returned 404)',
        body: 'This is fallback content that was used when the API failed to return the expected data.',
        isFallback: true
      };
    }
    
    const data = await res.json();
    return { ...data, isFallback: false };
  } catch (error) {
    return {
      id: 999,
      title: 'Fallback Title (Network Error)',
      body: 'This is fallback content that was used when a network error occurred.',
      isFallback: true
    };
  }
}

export default async function ErrorHandlingISGPage() {
  const { data, error } = await getData();
  const fallbackData = await getDataWithFallback();
  const currentTime = new Date().toLocaleTimeString();

  return (
    <div className="container mx-auto p-8">
      <Link href="/isg-examples" className="text-blue-600 hover:underline mb-4 block">
        ← Back to ISG Examples
      </Link>
      
      <h1 className="text-3xl font-bold mb-6">Error Handling in ISG</h1>
      
      <div className="bg-green-50 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">How it works:</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>ISG pages can encounter errors during revalidation</li>
          <li>Proper error handling ensures graceful degradation</li>
          <li>Fallback data can be used when APIs fail</li>
          <li>Error boundaries can catch and handle errors</li>
          <li>Monitoring and logging are crucial for debugging</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="border p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Error Handling Example</h3>
          {error ? (
            <div className="bg-red-50 border border-red-200 p-4 rounded">
              <h4 className="font-semibold text-red-800 mb-2">Error Occurred:</h4>
              <p className="text-red-700">{error}</p>
              <p className="text-sm text-red-600 mt-2">
                The page will still render, but without the dynamic data.
              </p>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 p-4 rounded">
              <h4 className="font-semibold text-green-800 mb-2">Success:</h4>
              <div className="space-y-2">
                <p><strong>Title:</strong> {data?.title}</p>
                <p><strong>Body:</strong> {data?.body}</p>
              </div>
            </div>
          )}
        </div>

        <div className="border p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Fallback Data Example</h3>
          <div className={`border p-4 rounded ${fallbackData.isFallback ? 'bg-yellow-50 border-yellow-200' : 'bg-green-50 border-green-200'}`}>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">Data Source:</h4>
              {fallbackData.isFallback && (
                <span className="bg-yellow-600 text-white px-2 py-1 rounded text-xs">FALLBACK</span>
              )}
            </div>
            <div className="space-y-2">
              <p><strong>Title:</strong> {fallbackData.title}</p>
              <p><strong>Body:</strong> {fallbackData.body}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <span className="font-semibold">Revalidation:</span> Every minute
            </div>
            <div>
              <span className="font-semibold">Error Rate:</span> ~30% (simulated)
            </div>
          </div>
        </div>

        <div className="border p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Error Handling Strategies</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold">Try-Catch Blocks</h4>
              <p className="text-sm">Wrap API calls in try-catch to handle errors gracefully</p>
            </div>
            <div>
              <h4 className="font-semibold">Fallback Data</h4>
              <p className="text-sm">Provide default content when APIs fail</p>
            </div>
            <div>
              <h4 className="font-semibold">Error Boundaries</h4>
              <p className="text-sm">React components that catch JavaScript errors</p>
            </div>
            <div>
              <h4 className="font-semibold">Monitoring</h4>
              <p className="text-sm">Log errors for debugging and alerting</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-yellow-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Error Handling Best Practices:</h3>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Always handle errors</strong> - Don't let unhandled errors break your ISG pages</li>
          <li><strong>Use fallback data</strong> - Provide meaningful default content</li>
          <li><strong>Log errors</strong> - Monitor and track error patterns</li>
          <li><strong>Set appropriate timeouts</strong> - Prevent hanging requests</li>
          <li><strong>Use error boundaries</strong> - Catch React component errors</li>
          <li><strong>Implement retry logic</strong> - For transient failures</li>
          <li><strong>Graceful degradation</strong> - Ensure core functionality works even with errors</li>
        </ul>
      </div>

      <div className="mt-6 p-6 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Common ISG Error Scenarios:</h3>
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold">API Failures</h4>
            <p className="text-sm">External APIs returning errors or being unavailable</p>
          </div>
          <div>
            <h4 className="font-semibold">Network Issues</h4>
            <p className="text-sm">Connectivity problems during revalidation</p>
          </div>
          <div>
            <h4 className="font-semibold">Data Parsing Errors</h4>
            <p className="text-sm">Invalid JSON or unexpected data formats</p>
          </div>
          <div>
            <h4 className="font-semibold">Timeout Errors</h4>
            <p className="text-sm">Requests taking too long to complete</p>
          </div>
        </div>
      </div>
    </div>
  );
} 