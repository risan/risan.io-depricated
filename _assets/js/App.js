class App {
  constructor() {
    this.elementFinder = new ElementFinder();
    this.elementCreator = new ElementCreator();
    this.loadElements();
    this.attachEventListeners();
  }

  loadElements() {
    this.$el = {
      body: this.elementFinder.findByTag('body'),
      btnNavbarOpen: this.elementFinder.findById('btn-navbar-open'),
      btnNavbarClose: this.elementFinder.findById('btn-navbar-close'),
      overlay: this.elementCreator.create('div', { id: 'overlay', classes: 'overlay' })
    };
  }

  attachEventListeners() {
    this.$el.btnNavbarOpen.addEventListener('click', e => this.openNavbar());
    this.$el.btnNavbarClose.addEventListener('click', e => this.closeNavbar());
    this.$el.overlay.addEventListener('click', e => this.closeNavbar());
  }

  openNavbar() {
    this.$el.body.addClass('navbar-open');
    this.addNavbarOverlay();
  }

  closeNavbar() {
    this.$el.body.removeClass('navbar-open');
    this.removeNavbarOverlay();
  }

  addNavbarOverlay() {
    this.$el.body.append(this.$el.overlay);
  }

  removeNavbarOverlay() {
    this.elementFinder.findById('overlay').remove();
  }
}
