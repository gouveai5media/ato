import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a self-contained Node.js server for managed hosts such as Hostinger.
  // The regular Sites worker output is kept alongside it in dist/server.
  output: "standalone",
};

export default nextConfig;
