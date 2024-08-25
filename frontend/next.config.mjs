/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "**",
        pathname: "**",
      },
    ],
    formats: ["image/webp"],
  },
};

export default nextConfig;
