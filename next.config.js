/* eslint-disable @typescript-eslint/no-var-requires */
const withImages = require('next-images');

module.exports = withImages({
  trailingSlash: true,
  pageExtensions: ['jsx', 'tsx'],
  reactStrictMode: true,

  typescript: {
    ignoreBuildErrors: true,
  },
});
