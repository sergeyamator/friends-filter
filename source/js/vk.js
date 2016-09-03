'use strict';

let Handlebars = require('handlebars');

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
    }, 2);
  })
}).then(() => {
  return new Promise((resolve, reject) => {
    VK.api('friends.get',{'name_case' : 'nom', fields: 'nickname'}, response => {
      let source = document.querySelector('.user-template').innerHTML,
        templateFunction = Handlebars.compile(source),
        template = templateFunction({data: response.response});

      document.querySelector('.friends_list').innerHTML = template;
      resolve();
    })
  });
});




