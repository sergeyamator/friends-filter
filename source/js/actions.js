'use strict';

let actions = {
  /**
   * Move element from one place into target element
   * @param {HTMLElement} target
   * @param {HTMLElement} element
   */
  moveElement(target, element) {
    target.appendChild(element);
  },

  /**
   * Add class to element
   * @param {HTMLElement} element
   * @param {String} className
   */
  addClass(element, className) {
    element.classList.add(className);
  },

  /**
   * Remove class from element
   * @param {HTMLElement} element
   * @param {String} className
   */
  removeClass(element, className) {
    element.classList.remove(className);
  },

  /**
   * Move friend from one column to another.
   * If deleted is false moves from all friends to
   * selected friends' list
   *
   * If deleted is true moves from selected to all
   * friends' list
   * @param {Boolean} deleted
   * @param {HTMLElement} target
   * @param {HTMLElement} element
   */
  move(deleted, element, target) {
    this.moveElement(target, element);

    if (deleted) {
      this.removeClass(element, 'deleted');
      element.setAttribute('draggable', 'true');
    } else {
      this.addClass(element, 'deleted');
      element.removeAttribute('draggable');
    }
  }
};


module.exports = actions;