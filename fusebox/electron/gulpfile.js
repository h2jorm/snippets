const fsbx = require('fuse-box');
const gulp = require('gulp');
const electron = require('electron-connect').server.create();

const fuseBox = new fsbx.FuseBox({
  homeDir: 'src/',
  sourceMap: {
    bundleReference: 'sourcemaps.js.map',
    outFile: './build/sourcemaps.js.map',
  },
  outFile: './build/bundle.js',
  plugins: [
    fsbx.JSONPlugin(),
    fsbx.BabelPlugin({
      config: {
        sourceMaps: true,
        presets: ['latest'],
        plugins: [
          'transform-react-jsx',
        ],
      }
    }),
    [
      fsbx.SassPlugin({ outputStyle: 'compressed' }),
      fsbx.CSSPlugin({ minify: false }),
    ],
  ],
});

gulp.task('bundle', () => {
  fuseBox.bundle('>index.js')
});

gulp.task('index.html', (done) => {
  gulp.src('./src/index.html')
  .pipe(gulp.dest('./build'))
  .on('end', done);
});

gulp.task('default', ['bundle', 'index.html'], function () {
  electron.start();
  gulp.watch('main.js', electron.restart);
  gulp.watch(['src/**/*.**'], ['bundle', electron.reload]);
  gulp.watch('src/index.html', ['index.html'], electron.reload);
});
