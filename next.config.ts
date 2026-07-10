import type { NextConfig } from "next"

const backendUrl =
  process.env.BACKEND_URL?.replace(/\/$/, "") || "http://127.0.0.1:3001"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ['192.168.3.92', '127.0.0.1', 'localhost'],
  async rewrites() {
    return [
      {
        source: "/api-backend/:path*",
        destination: `${backendUrl}/:path*`,
      },
    ]
  },
}

export default nextConfig
