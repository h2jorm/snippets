const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    vendor: [
      'es6-shim',
      'rxjs/Rx.js',
      'angular2/bundles/angular2-polyfills',
      'angular2/bundles/router.dev.js',
      'angular2/bundles/http.dev.js',
      'angular2/core',
      'angular2/router',
      'angular2/http',
      'angular2/platform/browser',
    ],
    bundle: './app/main.ts',
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
  },
  devtool: '#sourcemap',
  module: {
    loaders: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader' },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: process.env.NODE_ENV === 'production' ? '[chunkhash].js' : '[name].js',
    }),
  ],
};
