var
  gulp         = require('gulp'),

  autoprefixer = require('gulp-autoprefixer'),
  babel        = require('gulp-babel'),
  browsersync  = require('browser-sync').create(),
  concat       = require('gulp-concat'),
  del          = require('del'),
  eslint       = require('gulp-eslint'),
  imagemin     = require('gulp-imagemin'),
  sourcemaps   = require('gulp-sourcemaps'),
  uglify       = require('gulp-uglify'),

  dev = {
    files: [
      './img/',
      './js/src/tada.mp3',
      './*.html',
    ],
    css: './css/main.css',
    js: [
      './js/src/client.js',
      './js/src/map.js',
      './js/src/ui.js',
      './js/src/clock.js'
    ],
    babel: {
      plugins: [['@babel/plugin-proposal-class-properties', { 'loose': true }]],
      presets: ['@babel/preset-env'],
    },
    img: './img/**'
  },

  dist = {
    root:  './gh-pages/',
    files: distFiles,
    css:   './gh-pages/css/',
    js:    './gh-pages/js/',
    img:   './gh-pages/img/'
  };

function distFiles() {
  return dev.files.map(function(file) {
    return dist.root + file.substr(2);
  });
}

function uglifyError(error) {
  console.log(
    `Uglify error on ${error.cause.filename} line ${error.cause.line}: ${error.cause.message}`
  );
}

function babelError(error) {
  console.log(
    `Babel error on ${error.fileName} line ${error.loc.line}: ${error.message}`
  );
}

gulp.task('css', async function() {
  gulp
    .src(dev.css)
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dist.css));
});

gulp.task('js', async function() {
  gulp
    .src(dev.js)
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(babel(dev.babel)).on('error', babelError)
    .pipe(uglify()).on('error', uglifyError)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dist.js));
});


gulp.task('img', async function() {
  gulp
    .src(dev.img)
    .pipe(imagemin())
    .pipe(gulp.dest(dist.img));
});

gulp.task('clean', async function () {
  del.sync(dist.files());
});

gulp.task('dist', gulp.series(['clean'], async function () {
  gulp
    .src(dev.files)
    .pipe(gulp.dest(dist.root));
}));

gulp.task('watch', async function() {
  gulp.watch('./css/**', gulp.series('css'));
  gulp.watch(dev.js,     gulp.series('js'));
  gulp.watch(dev.img,    gulp.series('img'));
  gulp.watch(dev.files,  gulp.series('dist'));
  gulp.watch('./css/**', browsersync.reload);
  gulp.watch(dev.js,     browsersync.reload);
  gulp.watch(dev.img,    browsersync.reload);
  gulp.watch(dev.files,  browsersync.reload);
});

gulp.task('server', async function() {
  browsersync.init({
    server: {
      baseDir: dist.root,
      routes: {
        '/test': 'js'
      }
    },
    port:   4000,
    notify: false,
    open:   false
  });
});

gulp.task('default', gulp.parallel('css', 'js', 'img', 'dist', 'server', 'watch'));
