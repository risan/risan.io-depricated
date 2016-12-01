let babel = require('gulp-babel');
let gulp = require('gulp');
let Task = require('./Task');
let uglify = require('gulp-uglify');

class ScriptTask extends Task {
  moduleName() {
    return 'scripts';
  }

  gulpTask() {
    return gulp
      .src(this.options.src)
      .pipe(this.initSourceMaps())
      .pipe(this.transform())
      .pipe(this.concat())
      .pipe(this.minify())
      .on('error', this.onError())
      .pipe(this.writeSourceMaps())
      .pipe(gulp.dest(this.options.output.dir))
      .pipe(this.onSuccess());
  }

  transform() {
    if (this.options.transform === false) {
      return this.stream();
    }

    return babel();
  }

  minifier() {
    return uglify();
  }
}

module.exports = ScriptTask;
