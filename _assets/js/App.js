class App {
  constructor() {
    this.loadElements();
    this.attachEventListeners();
  }

  loadElements() {
    this.$el = {
      navbar: new Element(document.getElementsByClassName('navbar')[0]),
      navbarToogle: new Element(document.getElementsByClassName('navbar-toggle')[0])
    };
  }

  attachEventListeners() {
    let self = this;

    this.$el.navbarToogle.addEventListener('click', function(e) {
      self.toogleNav(e);
    });
  }

  toogleNav(e) {
    e.preventDefault();
    this.$el.navbar.toogleClass('navbar-open');

    let toogleNavText = this.$el.navbar.hasClass('navbar-open') ? 'Close' : 'Menu';
    this.$el.navbarToogle.text(toogleNavText);
  }
}
