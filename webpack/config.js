const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

let devtool = 'source-map';
let outputPath = '/';
let filename = '[name].js';

const rules = [
  {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    options: {
      presets: ['es2015', 'stage-2'],
      plugins: ['transform-runtime'],
    },
  },
  {
    test: /\.sass$/,
    loader: ExtractTextPlugin.extract({
      use: [
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            minimize: isProd ? true : false,
          },
        },
        'postcss-loader',
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        }
      ]
    }),
  },
  {
    test: /\.(jpg|jpeg|png|gif)$/,
    loader: 'url-loader',
    options: {
      limit: 1000,
      name: 'images/[name]-[hash:6].[ext]'
    },
  },
  {
    test: /\.svg$/,
    loader: 'svg-sprite-loader',
  },
];

const plugins = [
  new webpack.ProvidePlugin({
    'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
  }),
  new ManifestPlugin(),
  new ExtractTextPlugin({
    filename: isProd ? '[contenthash].css' : '[name].css',
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
    filename: isProd ? '[chunkhash].js' : '[name].js',
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [
        autoprefixer({
          browsers: ['last 2 versions'],
        }),
      ],
    },
  }),
];

if (isProd) {
  outputPath = path.join(__dirname, 'dist');
  filename = 'name-[chunkhash:6].js';
  plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );
}

module.exports = {
  entry: {
    vendor: [
      'whatwg-fetch',
    ],
    bundle: './src/index.js',
  },
  output: {
    path: '/',
    publicPath: '/assets',
    filename: '[name].js',
    library: 'LibName',
    libraryTarget: 'umd',
  },
  resolve: {
    alias: {
      '#': path.join(__dirname, 'src'),
    },
    extensions: [
      '.js', '.json', '.sass'
    ],
  },
  module: { rules },
  plugins,
};
