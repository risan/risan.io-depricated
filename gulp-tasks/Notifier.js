let notify = require('gulp-notify');

class Notifier {
  constructor() {
    this.title = 'risan.io';
  }

  notifyInfo(message) {
    notify.logLevel(0);

    return notify({
      title: this.title,
      message: message,
      onLast: true
    });
  }

  notifyError(e, message) {
    notify.onError({
      title: this.title,
      message: `${message}: <%= error.message %>`,
      onLast: true
    })(e);

    console.log(e);
  }
}

module.exports = Notifier;
