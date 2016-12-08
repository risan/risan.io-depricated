class App {
  constructor() {
    this.elementFinder = new ElementFinder();
    this.loadElements();
    this.attachEventListeners();
  }

  loadElements() {
    this.$el = {
      body: this.elementFinder.findByTag('body'),
      btnNavbarOpen: this.elementFinder.findById('btn-navbar-open'),
      btnNavbarClose: this.elementFinder.findById('btn-navbar-close'),
      overlay: this.elementFinder.findById('overlay')
    };
  }

  attachEventListeners() {
    this.$el.btnNavbarOpen.addEventListener('click', e => this.openNavbar());
    this.$el.btnNavbarClose.addEventListener('click', e => this.closeNavbar());
    this.$el.overlay.addEventListener('click', e => this.closeNavbar());
  }

  openNavbar() {
    this.$el.body.addClass('navbar-open');
  }

  closeNavbar() {
    this.$el.body.removeClass('navbar-open');
  }
}
