import type { NextConfig } from "next";
import "./src/env";

// Standalone: o Dockerfile de produção copia .next/standalone.
// Não trocar para "export" sem rever DECISIONS.md.
// Cache Components e a regra do Tailwind vieram do scaffold em teste/.
const nextConfig: NextConfig = {
  output: "standalone",
  // cacheComponents left off: TanStack Query stayed pending/fetching without running queryFn.
  transpilePackages: ["@fabriciogferreira/use-url-query"],
  allowedDevOrigins: ["127.0.0.1"],

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
