class Element {
  constructor($el) {
    this.$el = $el;
  }

  setAttribute(name, value) {
    this.$el.setAttribute(name, value);

    return this;
  }

  text(content) {
    this.$el.textContent = content;

    return this;
  }

  addEventListener(type, listener) {
    this.$el.addEventListener(type, listener, false);

    return this;
  }

  hasClass(name) {
    return this.getIndexOfClass(name) >= 0;
  }

  addClass(name) {
    if (this.hasClass(name)) {
      return this;
    }

    let classes = this.getClasses();
    classes.push(name);

    return this.setClasses(classes);
  }

  removeClass(name) {
    let classIndex = this.getIndexOfClass(name);

    if (classIndex === -1) {
      return this;
    }

    let classes = this.getClasses()
    classes.splice(classIndex, 1);

    return this.setClasses(classes);
  }

  toogleClass(name) {
    if (this.hasClass(name)) {
      return this.removeClass(name);
    }

    return this.addClass(name);
  }

  getIndexOfClass(name) {
    return this.getClasses().indexOf(name);
  }

  getClasses() {
    return this.$el.className.split(/\s+/);
  }

  setClasses(classes) {
    this.$el.className = classes.join(' ').replace(/^\s+|\s+$/, '');

    return this;
  }

  append(element) {
    this.$el.appendChild(element.$el);

    return this;
  }

  remove() {
    if (this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }

    return this;
  }
}
