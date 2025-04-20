/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "java-users-rest-api-bucket.s3.us-east-1.amazonaws.com",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "**"
      }
    ],
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/signin',
        permanent: true
      }
    ]
  }
};

export default nextConfig;
