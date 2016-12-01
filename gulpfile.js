let ScriptTask = require('./gulp-tasks/ScriptTask');
let StyleTask = require('./gulp-tasks/StyleTask');
let gulp = require('gulp');

gulp.task('default', ['loadCSS', 'scripts', 'styles']);

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
  gulp.watch('./_assets/sass/**/*.scss', ['styles']);
});
