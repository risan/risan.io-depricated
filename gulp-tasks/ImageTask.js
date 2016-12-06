let changed = require('gulp-changed');
let gulp = require('gulp');
let gutil = require('gulp-util');
let imagemin = require('gulp-imagemin');
let imageResize = require('gulp-image-resize');
let os = require('os');
let parallel = require('concurrent-transform');
let Task = require('./Task');

class ImageTask extends Task {
  moduleName() {
    return 'images';
  }

  gulpTask() {
    return gulp
      .src(this.options.src)
      .pipe(this.changed())
      .pipe(this.parallel(this.resize(this.options.resize)))
      .pipe(this.optimize())
      .on('error', this.onError())
      .pipe(gulp.dest(this.options.output.dir))
      .pipe(this.onSuccess());
  }

  resize(options) {
    return imageResize(options);
  }

  optimize() {
    return imagemin([
      imagemin.gifsicle(),
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng()
    ]);
  }

  changed() {
    if (this.isForce()) {
      return this.stream();
    }

    return changed(this.options.output.dir);
  }

  parallel(task) {
    return parallel(task, this.getAvailableCpuCores());
  }

  getAvailableCpuCores() {
    return os.cpus().length;
  }

  isForce() {
    return gutil.env.force === true;
  }
}

module.exports = ImageTask;
