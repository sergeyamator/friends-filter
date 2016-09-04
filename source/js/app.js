'use strict';

require('./vk');

let getFilteredData = require('./getFilteredData');
let render = require('./render');

/**
 * Add event listener to search field
 * that enables search friends by first or last name
 */
document.querySelector('.friends_search-input').addEventListener('input', (e) => {
  let key = e.target.value;

  new Promise((resolve) => {
    VK.api('friends.get', {'name_case' : 'nom', fields: 'nickname'}, response => {
      render(getFilteredData(response.response, key));
      resolve();
    })
  });
});
