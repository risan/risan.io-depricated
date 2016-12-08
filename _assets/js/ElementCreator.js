class ElementCreator {
  create(tag, options) {
    let element = new Element(document.createElement(tag));

    if (typeof options !== 'object') {
      return element;
    }

    if (options.id) {
      element.setAttribute('id', options.id);
    }

    if (options.classes) {
      if (typeof options.classes === 'string') {
        options.classes = [options.classes];
      }

      element.setClasses(options.classes);
    }

    return element;
  }
}
