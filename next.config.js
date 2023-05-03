/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        // destination: "http://localhost:4000/api/:path*",
        destination: "https://niambackend.cyclic.app/api/:path*",
        // alt_destination: "https://niam-backend.onrender.com/api/:path*",
      },
    ];
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
