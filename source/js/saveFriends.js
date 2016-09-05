'use strict';

let getFriendsFromList = require('./getFriendsFromList');

/**
 * Save all children data from parent @param element into
 * localstorage with @param name
 * @param {HTMLElement} element
 * @param {String} storageName
 * @param {Boolean} deleted
 */
function saveFriends(element, storageName, deleted) {
  let data = JSON.stringify(getFriendsFromList(element, deleted));
  localStorage.setItem(storageName, data);
}

module.exports = saveFriends;