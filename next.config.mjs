/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "java-users-rest-api-bucket.s3.us-east-1.amazonaws.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
