#!/bin/sh

project=$1;

use(){
  echo "usage ./install.sh <project_name>"
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
  extract-text-webpack-plugin@beta \
  webpack-manifest-plugin \
  browser-sync \
  webpack-dev-middleware
}

dl_file(){
  curl https://raw.githubusercontent.com/leeching/snippets/master/$1 > $2
}

init(){
  mkdir $project
  cd $project
  npm init -y
  dl_file webpack/config.js webpack.config.js
  dl_file bs.js bs.js
  dl_file webpack/index.html index.html
  do_yarn
}

if [ $# -lt 1 ]
then
  use
else
  init
fi

