'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * ========================================================================
 * ToggleItems 1.0
 * vertical accordion & content toggle component.
 * YILING CHEN.
 * Copyright 2020, MIT License.
 * How to use it:
 * // <ul data-toggle-list>
 * //  <li>
 * //    <button><i></i></button>
 * //    <div></div>
 * //  </li>
 * // </ul>
 * window.addEventListener('DOMContentLoaded', function(){ 
 * new Accordion('[data-toggle-list]', true); });
 * the second arg represents the toggle way of one to one(false) 
 * or one to more(true).
 * How to customize it(depreciated):
 * only classes and animate can be customized before the class initialize
 * ========================================================================
 */

// Create a class
var Accordion = function () {
  // **********Static variables********** //
  function Accordion(selector, bool) {
    _classCallCheck(this, Accordion);

    this.bool = false;
    // Default values
    var dom = Array.prototype.slice.call(document.querySelectorAll(selector));
    var len = dom ? dom.length : 0;
    for (var i = 0; i < len; i++) {
      this[i] = dom[i];
      this.element = this[i];
      this.play(bool);
    }
  }

  _createClass(Accordion, [{
    key: 'replace',
    value: function replace(ele, a, b) {
      if (ele.contains(a)) {
        ele.add(b);
        ele.remove(a);
        return true;
      }
      return false;
    }
  }, {
    key: 'toggleClass',
    value: function toggleClass(ele) {
      ele.classList.contains('fa-plus') ? this.replace(ele.classList, 'fa-plus', 'fa-minus') : this.replace(ele.classList, 'fa-minus', 'fa-plus');
    }
  }, {
    key: 'toggleContent',
    value: function toggleContent(ele) {
      ele.offsetHeight == 0 ? ele.style.display = 'block' : ele.style.display = 'none';
    }
  }, {
    key: 'play',
    value: function play(bool) {
      var items = this.element.children;
      var _this = this;
      var idx = void 0;

      var _loop = function _loop(i) {
        items[i].onclick = function () {
          Array.prototype.slice.call(this.parentNode.children).forEach(function (e, _i) {
            if (idx == i || bool == false) return;
            e.children[0].children[0].classList.replace('fa-minus', 'fa-plus');
            e.children[1].style.display = 'none';
          });
          _this.toggleClass(this.children[0].lastElementChild);
          _this.toggleContent(this.children[1]);
          window.scroll(0, this.offsetTop);
          idx = i;
        };
      };

      for (var i = 0; i < items.length; i++) {
        _loop(i);
      }
    }
  }]);

  return Accordion;
}();

;
