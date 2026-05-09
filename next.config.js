/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.gpteng.co',
      },
    ],
  },
  turbopack: {
    root: 'C:\\Users\\Theo\\Desktop\\medina\\Maid',
  },
  allowedDevOrigins: ['192.168.0.6'],
};

export default nextConfig;
