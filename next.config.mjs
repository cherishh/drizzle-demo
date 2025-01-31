import MillionLint from '@million/lint';
// @ts-check
import withPlaiceholder from '@plaiceholder/next';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
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

export default MillionLint.next({
  enabled: true,
  rsc: true
})(withPlaiceholder(nextConfig));
