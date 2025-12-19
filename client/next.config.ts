import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        // Allow all paths under your Cloudinary cloud (dk0xixdob)
        pathname: "/dk0xixdob/**",
      },
      {
        protocol: "https",
        hostname: "api.example.com",
        pathname: "/uploads/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  output: "standalone",
  reactStrictMode: true,
};

export default nextConfig;
