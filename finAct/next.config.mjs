/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  experimental: {
    esmExternals: "loose",
    serverComponentsExternalPackages: ["mongoose"],
  },
  webpack: (config) => {
    config.experiments = {
      topLevelAwait: true,
      layers: true
    };
    return config;
  },
}

export default nextConfig
