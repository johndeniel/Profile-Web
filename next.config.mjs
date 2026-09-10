import nextra from 'nextra';

const withNextra = nextra({});

export default withNextra({
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ac7i1iecykk48zds.public.blob.vercel-storage.com',
      },
    ],
  },
});
