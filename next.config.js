/**
 * withPWA (> v5.5.5) doesnt play well with webpack in dev mode calling GenerateSW multiple times
 * so, only use (and debug) in production builds
 */

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
