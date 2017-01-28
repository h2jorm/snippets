#!/bin/sh

project=$1;

use(){
  echo "usage ./install.sh project_name"
}

do_yarn(){
  yarn add --dev \
  webpack \
  babel-core \
  babel-loader \
  babel-preset-es2015 \
  babel-preset-stage-2 \
  node-sass \
  sass-loader \
  postcss-loader \
  css-loader \
  autoprefixer \
  imports-loader \
  exports-loader \
  whatwg-fetch \
  extract-text-webpack-plugin \
  webpack-manifest-plugin \
  browser-sync \
  webpack-dev-middleware
}

init(){
  mkdir $project
  cd $project
  npm init -y
  curl -o- https://raw.githubusercontent.com/leeching/snippets/master/webpack/config.js > webpack.config.js
  curl -o- https://raw.githubusercontent.com/leeching/snippets/master/bs.js > bs.js
  do_yarn
}

if [ $# -lt 1 ]
then
  use
else
  init
fi

