module.exports = {
  reactStrictMode: true,
  async rewrites () {
    return [
      {
        source: '/',
        destination: '/blog/recent',
        permanent: true
      }
    ];
  },
  env: {
    API_URL: 'api.localhost:8000'
  }
};
