import Link from 'next/link';

export default function ISGExamplesPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">ISG (Incremental Static Regeneration) Examples</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">What is ISG?</h2>
        <p className="text-lg mb-4">
          Incremental Static Regeneration (ISG) allows you to update static pages after you've built your site. 
          This means you can have the benefits of static generation with the ability to update content without rebuilding the entire site.
        </p>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold mb-2">Key Benefits:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Pages are statically generated at build time</li>
            <li>Pages can be updated on-demand without rebuilding</li>
            <li>Better performance than SSR for most use cases</li>
            <li>Reduced server load</li>
            <li>Better SEO due to static generation</li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/isg-examples/basic-isg" className="block p-6 border rounded-lg hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold mb-2">Basic ISG</h3>
          <p>Simple example with revalidate option</p>
        </Link>

        <Link href="/isg-examples/dynamic-routes/1" className="block p-6 border rounded-lg hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold mb-2">Dynamic Routes ISG</h3>
          <p>ISG with dynamic route parameters</p>
        </Link>

        <Link href="/isg-examples/on-demand" className="block p-6 border rounded-lg hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold mb-2">On-Demand ISG</h3>
          <p>Triggering revalidation programmatically</p>
        </Link>

        <Link href="/isg-examples/api-integration" className="block p-6 border rounded-lg hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold mb-2">API Integration</h3>
          <p>ISG with external API data</p>
        </Link>

        <Link href="/isg-examples/conditional-isg" className="block p-6 border rounded-lg hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold mb-2">Conditional ISG</h3>
          <p>ISG based on data conditions</p>
        </Link>

        <Link href="/isg-examples/error-handling" className="block p-6 border rounded-lg hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold mb-2">Error Handling</h3>
          <p>Handling errors in ISG scenarios</p>
        </Link>
      </div>

      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">ISG vs Other Rendering Methods</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h4 className="font-semibold">Static Generation (SSG)</h4>
            <p className="text-sm">Pages built at build time, never updated</p>
          </div>
          <div>
            <h4 className="font-semibold">ISG</h4>
            <p className="text-sm">Pages built at build time, updated periodically or on-demand</p>
          </div>
          <div>
            <h4 className="font-semibold">Server-Side Rendering (SSR)</h4>
            <p className="text-sm">Pages rendered on each request</p>
          </div>
        </div>
      </div>
    </div>
  );
} 