const path = require('path');
const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    vendor: [
      'whatwg-fetch',
    ],
    bundle: './src/index.js',
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    library: 'LibName',
    libraryTarget: 'umd',
  },
  resolve: {
    alias: {
      '#': path.join(__dirname, 'src'),
    },
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015'],
        },
      },
      {
        test: /\.less$/,
        loader: 'style!css?sourceMap!less?sourceMap',
      },
      {
        test: /\.html$/,
        loader: 'html',
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
  ],
};

if (!isProd) {
  module.exports.devtool = '#source-map';
}


if (isProd) {
  module.exports.output.path = path.join(__dirname, 'dist');
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false}
    })
  );
}
