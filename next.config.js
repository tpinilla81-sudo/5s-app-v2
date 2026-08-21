const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configuración explícita para webpack - resolver @/* paths
  webpack: (config, { isServer }) => {
    // Fix: ensure @ alias points to project root
    config.resolve.alias['@'] = path.resolve(__dirname);
    
    // Ensure .ts and .tsx extensions are included
    config.resolve.extensions = ['.ts', '.tsx', '.js', '.jsx', '.json'];
    
    return config;
  },
};

module.exports = nextConfig;
