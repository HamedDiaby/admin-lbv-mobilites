const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components/index'),
      '@pages': path.resolve(__dirname, 'src/pages/index'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@contexts': path.resolve(__dirname, 'src/contexts/index'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
};
