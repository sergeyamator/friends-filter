'use strict';

let Handlebars = require('handlebars');

let _templates = {};
function compile(templateName, data) {
  if (typeof templateName !== 'string') {
    return;
  }

  if (!_templates[templateName]) {
    _templates[templateName] = document.querySelector('#' + templateName).innerHTML;
  }

  let template = _templates[templateName];

  if (!template) {
    return;
  }

  let templateFunction = Handlebars.compile(template);
  let templateElement = templateFunction(data);
  let wrapper = document.createElement('div');

  wrapper.innerHTML = templateElement;

  if (wrapper.children.length !== 1) {
    return;
  }

  return wrapper.firstElementChild;
}

module.exports = compile;