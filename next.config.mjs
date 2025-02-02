// @ts-check
import withPlaiceholder from '@plaiceholder/next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'pub-ce42191b7e6f487fa1077cb938dc35a3.r2.dev',
      },
    ],
  },
};

export default withNextIntl(withPlaiceholder(nextConfig));
