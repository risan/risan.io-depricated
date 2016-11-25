let autoprefixer = require('gulp-autoprefixer');
let cssClean = require('gulp-clean-css');
let gulp = require('gulp');
let Task = require('./Task');
let sass = require('gulp-sass');

class CssTask extends Task {
  gulpTask() {
    return gulp
      .src(this.options.src)
      .pipe(this.initSourceMaps())
      .pipe(sass())
      .on('error', this.onError())
      .pipe(this.autoPrefix())
      .pipe(this.concat())
      .pipe(this.minify())
      .on('error', this.onError())
      .pipe(this.writeSourceMaps())
      .pipe(gulp.dest(this.options.output.dir))
      .pipe(this.onSuccess());
  }

  autoPrefix() {
    return autoprefixer({
      browsers: ['> 1%'],
      cascade: false
    });
  }

  minifier() {
    return cleanCss();
  }
}

module.exports = CssTask;
