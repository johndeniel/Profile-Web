import nextra from 'nextra';

const withNextra = nextra({});

export default withNextra({
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'design-assets.adobeprojectm.com',
      },
    ],
  },
});
