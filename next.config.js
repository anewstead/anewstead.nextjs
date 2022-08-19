/**
 * withPWA (> v5.5.5) doesnt play well with webpack in dev mode calling GenerateSW multiple times
 * so, only use (and debug) in production builds
 */

/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');
const isDev = process.env.NODE_ENV === 'development';

const pwa = {
  dest: 'public',
  disable: true,
  register: false,
};

const next = {
  images: {
    domains: ['anewstead-content.netlify.app'],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = isDev ? next : withPWA({ pwa, ...next });
