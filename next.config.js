const withPWA = require('next-pwa');

module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable: true,
    // disable: process.env.NODE_ENV === 'development',
    // register: false,
  },
  images: {
    domains: ['anewstead-content.netlify.app'],
  },
});
