let ImageTask = require('./gulp-tasks/ImageTask');
let ScriptTask = require('./gulp-tasks/ScriptTask');
let StyleTask = require('./gulp-tasks/StyleTask');
let gulp = require('gulp');

gulp.task('default', ['critical', 'loadCSS', 'scripts', 'styles']);

gulp.task('critical', function() {
  return new StyleTask({
    src: './_assets/sass/critical.scss',
    output: './_includes/assets/critical.css',
    sourcemaps: false,
  }).gulpTask();
});

gulp.task('images', function() {
  return new ImageTask({
    src: './_assets/img/**/*.{gif,jpg,png}',
    output: './_site/assets/img/*',
    resize: {
      width: 1200,
      height: 0,
      upscale: false,
      crop: false,
      gravity: 'center',
      quality: 0.8
    }
  }).gulpTask();
});

gulp.task('loadCSS', function() {
  return new ScriptTask({
    src: './node_modules/fg-loadcss/src/loadCSS.js',
    output: './_includes/assets/loadCSS.js',
    sourcemaps: false,
    transform: false,
  }).gulpTask();
});

gulp.task('scripts', function() {
  return new ScriptTask({
    src: './_assets/js/**/*.js',
    output: './_site/assets/js/scripts.js'
  }).gulpTask();
});

gulp.task('styles', function() {
  return new StyleTask({
    src: [
      './node_modules/normalize.css/normalize.css',
      './_assets/sass/theme.scss'
    ],
    output: './_site/assets/css/styles.css'
  }).gulpTask();
});

gulp.task('watch', function() {
  gulp.watch('./_assets/js/**/*.js', ['scripts']);
  gulp.watch('./_assets/sass/**/*.scss', ['critical', 'styles']);
});
