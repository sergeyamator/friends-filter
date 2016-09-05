'use strict';

/**
 * Get data from rendered friends list
 * @param element
 * @param deleted
 * @returns {Array}
 */
function getFriendsFromList(element, deleted) {
  let friends = element.querySelectorAll('.user');
  let data = [];

  friends = Array.from(friends);

  friends.forEach((item) => {
    data.push({
      photo_50: item.children[0].src,
      first_name: item.children[1].textContent.split(' ')[0],
      last_name: item.children[1].textContent.split(' ')[1],
      deleted: deleted || false
    });
  });

  console.log(data);
  return data;
}

module.exports = getFriendsFromList;