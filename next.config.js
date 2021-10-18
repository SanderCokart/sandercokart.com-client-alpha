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
    API_URL: 'http://192.168.2.160',
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  }
};
