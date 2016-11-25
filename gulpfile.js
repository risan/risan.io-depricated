let StyleTask = require('./gulp-tasks/StyleTask');
let gulp = require('gulp');

gulp.task('styles', function() {
  return new StyleTask({
    src: [
      './node_modules/normalize.css/normalize.css',
      './_assets/sass/theme.scss'
    ],
    output: './_site/assets/css/style.css',
    sourceMaps: false
  }).gulpTask();
});

gulp.task('watch', function() {
  gulp.watch('./_assets/sass/**/*.scss', ['styles']);
});
