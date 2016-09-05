'use strict';

const ACCESS_FRIENDS = 2;
let render = require('./render');
let Draggable = require('./draggable');
let actions = require('./actions');

new Promise(resolve => {
  if (document.readyState === 'complete') {
    resolve();
  } else {
    window.onload = resolve;
  }
}).then(() => {
  return new Promise((resolve) => {
    VK.init({
      apiId: 5586953
    });

    VK.Auth.login(function(response) {
      if (response.session) {
        resolve(response);
      } else {
        console.log('не все ок');
      }
    }, ACCESS_FRIENDS);
  })
}).then(() => {
  let options = {
    'name_case': 'nom',
    fields: 'photo_50'
  };

  let draggableOptions = {
    parent: 'friends_list',
    element: 'user',
    targetElement: 'friends_list-added'
  };

  VK.api('friends.get', options, response => {
    render(response.response, 'friends_list');
    new Draggable(draggableOptions);

    let friendsBlock = document.querySelector('.friends_content');

    friendsBlock.addEventListener('click', (e) => {
      let target = e.target;

      if (!target.classList.contains('fa')) {
        return;
      }

      let parent = target.closest('.user');

      if (parent.classList.contains('deleted')) {
        actions.move(true, parent, document.querySelector('.friends_list'));
      } else {
        actions.move(false, parent, document.querySelector('.friends_list-added'));
      }
    });
  })
});




