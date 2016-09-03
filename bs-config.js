const proxy = require('http-proxy-middleware');

module.exports = {
  files: [
    './build/*.js',
  ],
  server: {
    baseDir: './build',
    middleware: {
      1: proxy('/admin/api', {
        target: TEST_SERVER,
        changeOrigin: true,
      }),
      2: require('connect-history-api-fallback')(),
    },
  },
};
