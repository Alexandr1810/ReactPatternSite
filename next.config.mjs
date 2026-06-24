/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [];
  },
  async headers() {
    return [
      {
        source: '/favicon.ico',
        headers: [
          { key: 'Content-Type', value: 'image/x-icon' },
        ],
      },
    ];
  },
};

export default nextConfig;
