const path = require('path');

module.exports = {
    reactStrictMode: false,
    async redirects() {
        return [
            {
                source: '/',
                destination: '/blog/recent',
                permanent: true
            }
        ];
    },
    images: {
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        domains: ['api.sandercokart.com', '192.168.2.160', '192.168.2.15'],
        formats: ['image/webp']
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')]
    }
};
