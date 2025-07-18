import withBundleAnalyzer from '@next/bundle-analyzer';

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  // ... your existing Next.js config (if any) ...
};

export default withAnalyzer(nextConfig);
