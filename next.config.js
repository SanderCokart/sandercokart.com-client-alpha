const path = require('path');

module.exports = {
    reactStrictMode: false,
    images: {
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        domains: ['api.sandercokart.com', '192.168.2.160', '192.168.2.15'],
        formats: ['image/avif', 'image/webp']

    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')]
    },
    webpack(config) {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false
        };

        return config;
    },
};
