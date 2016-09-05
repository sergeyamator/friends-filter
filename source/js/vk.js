'use strict';

const ACCESS_FRIENDS = 2;
let render = require('./render');
let Draggable = require('./draggable');

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
  })
});




