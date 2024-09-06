import withPWAInit from "@ducanh2912/next-pwa";

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

const withPWA = withPWAInit({
  dest: "public",
});

export default withPWA(nextConfig);
