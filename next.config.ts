import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  webpack: (config) => {
    // Exclude functions directory from the build
    config.externals = config.externals || [];
    config.externals.push({
      'firebase-functions': 'firebase-functions',
      'firebase-admin': 'firebase-admin'
    });

    // Suppress Sass deprecation warnings
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            sassOptions: {
              quietDeps: true,
              silenceDeprecations: ['legacy-js-api']
            }
          }
        }
      ]
    });

    return config;
  },
  // Exclude functions from TypeScript compilation
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  }
};

export default nextConfig;
