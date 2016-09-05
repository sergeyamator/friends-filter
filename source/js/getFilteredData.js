'use strict';

/**
 * Filters data if it content key
 * @param data
 * @param key
 * @returns {*|Array.<T>}
 */
function getFilteredData(data, key) {
  return data.filter((item) => {
    return item.first_name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || item.last_name.toLowerCase().indexOf(key.toLowerCase()) !== -1;
  });
}

module.exports = getFilteredData;