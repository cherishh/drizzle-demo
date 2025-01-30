import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 配置输出模式为 standalone
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        hostname: 'pub-ce42191b7e6f487fa1077cb938dc35a3.r2.dev',
      },
    ],
  },
};

export default nextConfig;
