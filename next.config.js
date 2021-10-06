const path = require('path');

module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/blog/recent',
        permanent: true,
      },
    ]
  },
  env: {
    API_URL: 'https://api.sandercokart.com/',
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  }
};
