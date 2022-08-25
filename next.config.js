/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: true,
  register: false,
});

const nextConfig = {
  images: {
    domains: ['anewstead-content.netlify.app'],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = withPWA(nextConfig);
