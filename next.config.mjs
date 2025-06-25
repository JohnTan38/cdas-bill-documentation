/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features if needed
  experimental: {
    // Enable MDX support if using app directory
    mdxRs: true,
  },
  
  // Configure page extensions to include MDX
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  
  // Webpack configuration for Mermaid and other client-side libraries
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Handle Mermaid and other client-side only packages
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
        stream: false,
        util: false,
        buffer: false,
        assert: false,
        os: false,
        url: false,
        querystring: false,
      };
    }
    
    // Exclude server-side packages from client bundle
    config.externals = config.externals || [];
    if (!isServer) {
      config.externals.push({
        'utf-8-validate': 'commonjs utf-8-validate',
        'bufferutil': 'commonjs bufferutil',
      });
    }
    
    // Handle dynamic imports for Mermaid
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    });
    
    return config;
  },
  
  // Image optimization configuration
  images: {
    domains: [
      'localhost',
      // Add your image domains here
    ],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Environment variables (if needed)
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Redirects (if needed)
  async redirects() {
    return [
      // Add your redirects here
    ];
  },
  
  // Headers configuration
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // Compiler options
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Output configuration
  output: 'standalone', // Use this for Docker deployments
  
  // Transpile packages that need it
  transpilePackages: [
    'mermaid',
    // Add other packages that need transpilation
  ],
};

module.exports = nextConfig;

// Alternative configuration for next.config.mjs (ES modules)
/*
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} * /
const nextConfig = {
  experimental: {
    mdxRs: true,
  },
  
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
        stream: false,
        util: false,
        buffer: false,
        assert: false,
        os: false,
        url: false,
        querystring: false,
      };
    }
    
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    });
    
    return config;
  },
  
  transpilePackages: ['mermaid'],
};

export default nextConfig;
*/

