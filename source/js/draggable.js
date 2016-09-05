'use strict';

class Draggable {
  constructor(options) {
    this.options = options;
    this.parent = document.querySelector(`.${options.parent}`);
    this.targetElement = document.querySelector(`.${options.targetElement}`);

    if (this.parent) {
      this.attachEvents();
    }
  }

  attachEvents() {
    this.parent.addEventListener('dragstart', this._onDragstart.bind(this), false);
    this.parent.addEventListener('dragend', this._onDragend.bind(this), false);

    this.targetElement.addEventListener('dragover', this._onDragover.bind(this), false);
    this.targetElement.addEventListener('drop', this._onDrop.bind(this), false);
    this.targetElement.addEventListener('dragenter', this._onDragenter.bind(this), false);
    this.targetElement.addEventListener('dragleave', this._onDragleave.bind(this), false);
  }

  _onDragstart(e) {
    let target = e.target;

    if (!target.closest(`.${this.options.element}`)) {
      return;
    }

    this.element = target.closest(`.${this.options.element}`);
    this.element.style.opacity = '0.4';
  }

  _onDragover(e) {
    if (e.preventDefault) {
      e.preventDefault(); // Necessary. Allows us to drop.
    }

    return false;
  }

  _onDragenter() {
    this.targetElement.classList.add('over');
  }

  _onDragleave() {
    this.targetElement.classList.remove('over');
  }

  _onDrop(e) {
    // this / e.target is current target element.
    e.preventDefault();

    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }

    this.element.style.opacity = '1';

    this.targetElement.appendChild(this.element);
    return false;
  }

  _onDragend() {
    this.targetElement.classList.remove('over');
  }
}

module.exports = Draggable;