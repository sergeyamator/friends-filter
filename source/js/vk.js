'use strict';

VK.init({
  apiId: 5586953
});

let cb = response => {
  if (response.session) {
    console.log('все ок');
  } else {
    console.log('не все ок');
  }
};

VK.Auth.login(cb);
