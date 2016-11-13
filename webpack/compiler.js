const webpack = require('webpack');
const config = require('./config');

const compiler = webpack(config);

function init() {
  const compiler = webpack(config);
  return compiler;
}

exports.run = function run() {
  const compiler = init();
  compiler.run((err, stats) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stats.toString({
      chunks: false,
      colors: true,
    }));
  });
  return compiler;
};

exports.watch = function watch(done) {
  const compiler = init();
  compiler.watch({
    aggregateTimeout: 300,
    poll: true,
  }, (err, stats) => {
    if (err) {
      console.error(err);
      return;
    }
    if (stats.hasErrors() || stats.hasWarnings()) {
      return;
    }
    done();
  });
  return compiler;
};
