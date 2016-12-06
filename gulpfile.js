let ImageTask = require('./gulp-tasks/ImageTask');
let ScriptTask = require('./gulp-tasks/ScriptTask');
let StyleTask = require('./gulp-tasks/StyleTask');
let gulp = require('gulp');

gulp.task('default', ['critical', 'styles', 'scripts', 'images' ]);

// Stylesheets task.
gulp.task('critical', function() {
  return new StyleTask({
    src: './_assets/sass/critical.scss',
    output: './_includes/assets/critical.css',
    sourcemaps: false
  }).gulpTask();
});

gulp.task('styles', function() {
  return new StyleTask({
    src: './_assets/sass/theme.scss',
    output: './_site/assets/css/styles.css'
  }).gulpTask();
});

// Javascript files task.
gulp.task('scripts', function() {
  return new ScriptTask({
    src: './_assets/js/**/*.js',
    output: './_site/assets/js/scripts.js'
  }).gulpTask();
});

// Images task.
gulp.task('images', function() {
  return new ImageTask({
    src: './_assets/img/**/*.{gif,jpg,png}',
    output: './_site/assets/img/*',
    resize: {
      width: 800,
      height: 450,
      upscale: false,
      crop: true,
      gravity: 'center',
      quality: 0.8
    }
  }).gulpTask();
});

gulp.task('watch', function() {
  gulp.watch('./_assets/sass/**/*.scss', ['critical', 'styles']);
  gulp.watch('./_assets/js/**/*.js', ['scripts']);
  gulp.watch('./_assets/img/**/*.{gif,jpg,png}', ['images']);
});
