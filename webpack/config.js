const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

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
    extensions: [
      '', '.webpack.js', '.web.js', '.js',
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
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: isProd ? '[chunkhash].js' : '[name].js',
    }),
  ],
};

if (!isProd) {
  module.exports.devtool = '#source-map';
  module.exports.module.loaders.push(
    {
      test: /\.scss$/,
      loader: 'style!css?sourceMap!postcss!sass?sourceMap',
    }
  );
}


if (isProd) {
  module.exports.output.path = path.join(__dirname, 'dist');
  module.exports.output.filename = '[chunkhash].js';
  module.exports.module.loaders.push(
    {
      test: /\.scss$/,
      loader: 'style!css!postcss!sass',
    }
  );
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false}
    })
  );
}
