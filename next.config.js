const path = require('path');

module.exports = {
  reactStrictMode: true,
  async rewrites () {
    return [
      {
        source: '/',
        destination: '/blog/recent'
      }
    ];
  },
  env: {
    API_URL: 'api.localhost:8000'
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  }
};
