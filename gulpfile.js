'use strict';

const gulp = require('gulp');
const path = require('path');
const plugins = require('gulp-load-plugins')();

gulp.task('styles', function() {
  return new CssTask({
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

class Task {
  constructor(options) {
    this.moduleName = 'CSS';
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
    return plugins.concat(this.options.output.base);
  }

  initSourceMaps() {
    if (!this.options.sourceMaps) {
      return this.stream();
    }

    return plugins.sourcemaps.init();
  }

  writeSourceMaps() {
    if (!this.options.sourceMaps) {
      return this.stream();
    }

    return plugins.sourcemaps.write('.');
  }

  onError() {
    let self = this;

    return function (e) {
      self.notifier.notifyError(e, `${self.moduleName} task is failed`);

      if (self.isWatching()) {
        this.emit('end');
      } else {
        process.exit(1);
      }
    };
  }

  onSuccess() {
    return this.notifier.notifyInfo(`${this.moduleName} task is completed!`);
  }

  stream() {
    return plugins.util.noop();
  }

  isInProduction() {
    return plugins.util.env.production === true;
  }

  isWatching() {
    return plugins.util.env._.indexOf('watch') > -1;
  }
}

class CssTask extends Task {
  gulpTask() {
    return gulp
      .src(this.options.src)
      .pipe(this.initSourceMaps())
      .pipe(plugins.sass())
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
    return plugins.autoprefixer({
      browsers: ['> 1%'],
      cascade: false
    });
  }

  minifier() {
    return plugins.cleanCss();
  }
}

class Notifier {
  constructor() {
    this.title = 'risan.io';
  }

  notifyInfo(message) {
    plugins.notify.logLevel(0);

    return plugins.notify({
      title: this.title,
      message: message,
      onLast: true
    });
  }

  notifyError(e, message) {
    plugins.notify.onError({
      title: this.title,
      message: `${message}: <%= error.message %>`,
      onLast: true
    })(e);

    console.log(e);
  }
}
