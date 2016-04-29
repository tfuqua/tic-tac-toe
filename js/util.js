function removeClasses (el, classes) {
  for (var i = classes.length; i--;) {
    el.classList.remove(classes[i]);
  }
}
