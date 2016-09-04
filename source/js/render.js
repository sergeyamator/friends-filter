'use strict';

let Handlebars = require('handlebars');

function render(data) {
  let source = document.querySelector('.user-template').innerHTML,
    templateFunction = Handlebars.compile(source),
    template = templateFunction({data: data});

  document.querySelector('.friends_list').innerHTML = template;
}

module.exports = render;