'use strict';

const ACCESS_FRIENDS = 2;
let render = require('./render');
let Draggable = require('./draggable');
let actions = require('./actions');

let friendsBlock = document.querySelector('.friends_content');

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
  if (localStorage.getItem('friends')) {
    let friends = JSON.parse(localStorage.getItem('friends'));
    let deletedFriends = JSON.parse(localStorage.getItem('deletedFriends'));

    let draggableOptions = {
      parent: 'friends_list',
      element: 'user',
      targetElement: 'friends_list-added'
    };

    new Draggable(draggableOptions);
    friendsBlock.addEventListener('click', _onClick);

    render(friends, 'friends_list');
    render(deletedFriends, 'friends_list-added', true);
    return;
  }

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
    friendsBlock.addEventListener('click', _onClick);
  })
});

function _onClick(e) {
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
}


