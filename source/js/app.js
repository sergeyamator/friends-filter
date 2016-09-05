'use strict';

require('./vk');

let getFilteredData = require('./getFilteredData');
let render = require('./render');
let Draggable = require('./draggable');
let saveFriends = require('./saveFriends');

let searchField = document.querySelector('.friends_search-input');
let saveButton = document.querySelector('.friends_save-button');
let clearButton = document.querySelector('.friends_clear-button');
/**
 * Add event listener to search field
 * that enables search friends by first or last name
 */
//TODO debounce
/**
 * When user enter search keywords
 * friends filtered by this keywords
 */
searchField.addEventListener('input', (e) => {
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

/**
 * When user click on the save button all friends save
 * to the localstorage
 */
saveButton.addEventListener('click', () => {
  saveFriends(document.querySelector('.friends_list-added'), 'deletedFriends', true);
  saveFriends(document.querySelector('.friends_list'), 'friends');
});

/**
 * If user click on clear button all friends data
 * clear from the localstorage
 */
clearButton.addEventListener('click', () => {
  if (confirm('Вы точно хотите удалить сохраненные данные?')) {
    localStorage.removeItem('friends');
    localStorage.removeItem('deletedFriends');
  }
});