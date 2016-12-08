class ElementFinder {
  findByTag(tag) {
    return new Element(document.getElementsByTagName(tag)[0]);
  }

  findById(id) {
    return new Element(document.getElementById(id));
  }
}
