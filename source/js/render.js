'use strict';

let compile = require('./compile');

function render(data, elementClass) {
  let fragment = document.createDocumentFragment();

  data.forEach(user => {
    let model = {
      firstName: user.first_name,
      lastName: user.last_name,
      photo: user.photo_50
    };

    let imgElement = compile('user-template', model);

    if (imgElement) {
      fragment.appendChild(imgElement);
    }
  });

  let usersList = document.querySelector('.' + elementClass);

  if (usersList.childNodes) {
    usersList.innerHTML = '';
  }

  usersList.appendChild(fragment);
}

module.exports = render;