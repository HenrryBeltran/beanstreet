/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "beanstreet.pages.dev",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
