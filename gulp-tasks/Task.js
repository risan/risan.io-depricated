let concat = require('gulp-concat');
let gutil = require('gulp-util');
let Notifier = require('./Notifier');
let path = require('path');
let sourcemaps = require('gulp-sourcemaps');

class Task {
  constructor(options) {
    this.notifier = new Notifier();
    this.options = options;
    this.options.output = path.parse(this.options.output);
  }

  minify() {
    if (!this.isInProduction()) {
      return this.stream();
    }

    return this.minifier();
  }

  concat() {
    return concat(this.options.output.base);
  }

  initSourceMaps() {
    if (this.isInProduction() || this.options.sourcemaps === false) {
      return this.stream();
    }

    return sourcemaps.init();
  }

  writeSourceMaps() {
    if (this.isInProduction() || this.options.sourcemaps === false) {
      return this.stream();
    }

    return sourcemaps.write('.');
  }

  onError() {
    let self = this;

    return function (e) {
      self.notifier.notifyError(e, `${self.moduleName()} task is failed`);

      if (self.isWatching()) {
        this.emit('end');
      } else {
        process.exit(1);
      }
    };
  }

  onSuccess() {
    return this.notifier.notifyInfo(`${this.moduleName()} task is completed!`);
  }

  stream() {
    return gutil.noop();
  }

  isInProduction() {
    return gutil.env.production === true;
  }

  isWatching() {
    return gutil.env._.indexOf('watch') > -1;
  }
}

module.exports = Task;
