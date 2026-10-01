import nextra from 'nextra';

const withNextra = nextra({});

export default withNextra({
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/mysql',
        destination: '/mysql/introduction',
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ac7i1iecykk48zds.public.blob.vercel-storage.com',
      },
    ],
  },
});
