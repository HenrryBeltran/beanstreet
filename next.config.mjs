import withPlaiceholder from "@plaiceholder/next";

const protocol = process.env.RP_PROTOCOL ?? "";
const hostname = process.env.RP_HOSTNAME ?? "";
const port = process.env.RP_PORT ?? "";
const pathname = process.env.RP_PATHNAME ?? "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol,
        hostname,
        port,
        pathname,
      },
    ],
  },
};

export default withPlaiceholder(nextConfig);
