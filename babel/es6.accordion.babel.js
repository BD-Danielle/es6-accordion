"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * ========================================================================
 * Accordion 1.1
 * toggle component
 * YILING CHEN.
 * Copyright 2022, MIT License
 * How to use it:
 * see README.md
 * ========================================================================
 */
var self_toggle = void 0;

var Accordion = function () {
  function Accordion(selector) {
    var auto = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var cls = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ["fa-plus", "fa-minus"];

    _classCallCheck(this, Accordion);

    self_toggle = this;
    this.selector = selector;
    this.play(auto, index, cls);
  }

  _createClass(Accordion, [{
    key: "toggleClass",
    value: function toggleClass(classList, a, b, bool) {
      if (bool) {
        classList.add(b);
        classList.remove(a);
        return;
      }
      classList.add(a);
      classList.remove(b);
    }
  }, {
    key: "play",
    value: function play(auto, index, cls) {
      var btn = void 0,
          content = void 0,
          buttons = void 0,
          contents = void 0,
          items = void 0;
      contents = this.contents;
      buttons = this.buttons;
      items = this.items;
      items.forEach(function (c) {
        return c.display = false;
      });
      buttons.forEach(function (c) {
        return c.setAttribute("data-toggle-btn", false);
      });
      if (!!index) {
        items[index - 1].display = true;
        buttons[index - 1].setAttribute("data-toggle-btn", items[index - 1].display);
        contents[index - 1].style.display = items[index - 1].display ? "block" : "none";
        this.toggleClass(buttons[index - 1].children[0].classList, cls[0], cls[1], items[index - 1].display);
      }
      for (var i = 0; i < items.length; i++) {
        items[i].onclick = function () {
          var _this = this;

          btn = this.children[0];
          content = this.children[1];
          if (auto) {
            buttons.forEach(function (c, i) {
              if (c.getAttribute("data-toggle-btn") == "true") {
                self_toggle.toggleClass(c.children[0].classList, cls[0], cls[1], false);
                c.setAttribute("data-toggle-btn", false);
                // c.nextElementSibling.style.display="none";
                contents[i].style.display = "none";
                // c.parentNode.display=this.display;
                items[i].display = _this.display;
              }
            });
          }
          this.display = !this.display;
          btn.setAttribute("data-toggle-btn", this.display);
          self_toggle.toggleClass(btn.children[0].classList, cls[0], cls[1], this.display);
          content.style.display = this.display ? "block" : "none";
        };
      }
    }
  }, {
    key: "items",
    get: function get() {
      return this.selector.querySelectorAll("[data-toggle-item]");
    }
  }, {
    key: "buttons",
    get: function get() {
      return this.selector.querySelectorAll("[data-toggle-btn]");
    }
  }, {
    key: "contents",
    get: function get() {
      return this.selector.querySelectorAll("[data-toggle-content]");
    }
  }]);

  return Accordion;
}();

window.addEventListener("DOMContentLoaded", function () {
  var lists = document.querySelectorAll("[data-toggle-list]");
  lists.forEach(function (c) {
    return new Accordion(c, true, 2, ["fa-plus", "fa-minus"]);
  });
});
