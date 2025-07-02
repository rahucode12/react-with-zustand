import Link from 'next/link';

const hooks = [
  {
    name: 'useSyncExternalStore',
    path: '/hooks-examples/use-sync-external-store',
    desc: 'Subscribe to external stores in a concurrent-safe way.'
  },
  {
    name: 'useInsertionEffect',
    path: '/hooks-examples/use-insertion-effect',
    desc: 'Inject styles into the DOM before layout and paint.'
  },
  {
    name: 'useDeferredValue',
    path: '/hooks-examples/use-deferred-value',
    desc: 'Defer updates to a value for improved UI responsiveness.'
  },
  {
    name: 'useTransition',
    path: '/hooks-examples/use-transition',
    desc: 'Mark state updates as transitions for non-urgent updates.'
  },
  {
    name: 'useId',
    path: '/hooks-examples/use-id',
    desc: 'Generate unique IDs that are stable across server and client.'
  },
  {
    name: 'useOptimistic',
    path: '/hooks-examples/use-optimistic',
    desc: 'Optimistic UI updates for async actions (React 19+).'
  },
  {
    name: 'useEvent',
    path: '/hooks-examples/use-event',
    desc: 'Stable event callbacks that don\'t change on every render (React 19+).'
  },
];

export default function HooksExamplesPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Latest React Hooks Examples</h1>
      <p className="mb-6 text-lg">Explore practical examples of the newest React hooks (React 18/19+). Click on any hook to see a live demo and code explanation.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hooks.map(hook => (
          <Link key={hook.name} href={hook.path} className="block p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">{hook.name}</h2>
            <p className="text-gray-700">{hook.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
} 