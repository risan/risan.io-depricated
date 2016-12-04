let ImageTask = require('./gulp-tasks/ImageTask');
let ScriptTask = require('./gulp-tasks/ScriptTask');
let StyleTask = require('./gulp-tasks/StyleTask');
let gulp = require('gulp');

gulp.task('default', ['images', 'logo', 'scripts', 'styles']);

gulp.task('images', function() {
  return new ImageTask({
    src: [
      './_assets/img/**/*.{gif,jpg,png}',
      '!./_assets/img/logo.jpg'
    ],
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

gulp.task('logo', function() {
  return new ImageTask({
    src: './_assets/img/logo.jpg',
    output: './_site/assets/img/logo.jpg',
    resize: {
      width: 150,
      height: 150,
      upscale: false,
      crop: false,
      gravity: 'center',
      quality: 1
    }
  }).gulpTask();
});

gulp.task('scripts', function() {
  return new ScriptTask({
    src: './_assets/js/**/*.js',
    output: './_includes/assets/scripts.js'
  }).gulpTask();
});

gulp.task('styles', function() {
  return new StyleTask({
    src: [
      './node_modules/normalize.css/normalize.css',
      './_assets/sass/theme.scss'
    ],
    output: './_includes/assets/styles.css',
    sourcemaps: false
  }).gulpTask();
});

gulp.task('watch', function() {
  gulp.watch('./_assets/img/**/*.{gif,jpg,png}', ['images', 'logo']);
  gulp.watch('./_assets/js/**/*.js', ['scripts']);
  gulp.watch('./_assets/sass/**/*.scss', ['styles']);
});
