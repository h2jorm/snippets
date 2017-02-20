const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    vendor: [
      'normalize.css/normalize.css',
    ],
    bundle: './src/index.js',
  },
  output: {
    path: '/',
    publicPath: '/assets',
    filename: '[name].js',
    library: 'Snippets',
    libraryTarget: 'umd',
  },
  resolve: {
    alias: {
      '#': path.join(__dirname, 'src'),
    },
    extensions: [
      '', '.webpack.js', '.web.js', '.js', '.sass'
    ],
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
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract(['css', 'postcss', 'sass']),
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(['css', 'postcss']),
      },
    ],
  },
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions'],
    }),
  ],
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new ExtractTextPlugin(isProd ? '[contenthash].css' : '[name].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: isProd ? '[chunkhash].js' : '[name].js',
    }),
  ],
};

if (!isProd) {
  module.exports.devtool = '#source-map';
}

if (isProd) {
  module.exports.output.path = path.join(__dirname, 'dist');
  module.exports.output.filename = '[chunkhash].js';
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false}
    })
  );
}
