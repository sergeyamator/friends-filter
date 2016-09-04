'use strict';

function getFilteredData(data, key) {
  return data.filter((item) => {
    return item.first_name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || item.last_name.toLowerCase().indexOf(key.toLowerCase()) !== -1;
  });
}

module.exports = getFilteredData;