'use strict';

require('./vk');

let getFilteredData = require('./getFilteredData');
let render = require('./render');
let Draggable = require('./draggable');

/**
 * Add event listener to search field
 * that enables search friends by first or last name
 */
//TODO debounce
document.querySelector('.friends_search-input').addEventListener('input', (e) => {
  let key = e.target.value;
  let options = {
    parent: 'friends_list',
    element: 'user',
    targetElement: 'friends_list-added'
  };

  new Promise((resolve) => {
    VK.api('friends.get', {'name_case': 'nom', fields: 'nickname, photo_50'}, response => {
      let filteredData = getFilteredData(response.response, key);
      render(filteredData, 'friends_list');
      new Draggable(options);
      resolve();
    })
  });
});
