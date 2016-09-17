// reference: https://github.com/Browsersync/recipes/tree/master/recipes/webpack.babel

const bs = require('browser-sync').create();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const proxy = require('http-proxy-middleware');
const PROXY_TARGET = process.argv[2];
if (!PROXY_TARGET) {
  console.error('invalid proxy target. Use like `node bs.js http://127.0.0.1:4000`');
  process.exit(1);
}

const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig);

compiler.plugin('done', function (stats) {
  if (stats.hasErrors() || stats.hasWarnings())
    return;
  bs.reload();
});

bs.init({
  open: false,
  middleware: [
    webpackDevMiddleware(compiler),
    proxy({
      target: PROXY_TARGET,
      changeOrigin: true,
    }),
  ],
});
