/** @type {import('next').NextConfig} */
const path = require("path");
const webpack = require("webpack");
const withImages = require("next-images");

const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  pageExtensions: ['mdx', 'md', 'jsx', 'tsx', 'js', 'ts'],
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: ["localhost","www.social-v2.com", "iili.io"],
  },
  webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: "@svgr/webpack",
    });
    config.resolve.fallback = { fs: false }
    return config;
  },

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

module.exports = nextConfig;
