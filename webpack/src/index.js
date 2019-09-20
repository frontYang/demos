function component() {
  var element = document.createElement('div');

  element.innerHTML = 'hel0o'

  return element;
}

document.body.appendChild(component());