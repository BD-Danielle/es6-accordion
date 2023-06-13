/*
 * ========================================================================
 * Accordion 1.2.0
 * toggle component
 * YILING CHEN.
 * Copyright 2022, MIT License
 * How to use it:
 * see README.md
 * ========================================================================
 */

class Accordion {
  constructor(options) {
    const {
      selector,
      auto = true,
      index = 0,
      cls = ["fa-plus", "fa-minus"],
      collapsible = true
    } = options;

    this.selector = selector;
    this.auto = auto;
    this.index = index;
    this.cls = cls ?? ['a', 'b'];
    this.collapsible = collapsible;

    this.initialize();
  }

  get items() {
    return this.selector.querySelectorAll("[data-toggle-item]");
  }

  get buttons() {
    return this.selector.querySelectorAll("[data-toggle-btn]");
  }

  get contents() {
    return this.selector.querySelectorAll("[data-toggle-content]");
  }

  toggleClass(classList, bool) {
    const [a, b] = this.cls;
    if (bool) {
      classList.add(b);
      classList.remove(a);
    } else {
      classList.add(a);
      classList.remove(b);
    }
  }

  initialize() {
    const contents = this.contents;
    const buttons = this.buttons;
    const items = this.items;
    items.forEach((item) => (item.display = false));
    buttons.forEach((button) => button.setAttribute("data-toggle-btn", false));

    if (this.index >= 0 && this.index <= items.length) {
      const item = items[this.index];
      item.display = true;
      buttons[this.index].setAttribute("data-toggle-btn", item.display);
      contents[this.index].style.display = item.display ? "block" : "none";
      this.toggleClass(buttons[this.index].children[0].classList, item.display);
    }

    items.forEach((item) => {
      item.onclick = () => {
        if (item.display && item.display === !this.collapsible) return;

        const button = item.children[0];
        const content = item.children[1];

        if (this.auto) {
          buttons.forEach((btn, i) => {
            if (btn.getAttribute("data-toggle-btn") === "true") {
              this.toggleClass(btn.children[0].classList, false);
              btn.setAttribute("data-toggle-btn", false);
              contents[i].style.display = "none";
              items[i].display = item.display;
            }
          });
        }

        item.display = !item.display;
        button.setAttribute("data-toggle-btn", item.display);
        this.toggleClass(button.children[0].classList, item.display);
        content.style.display = item.display ? "block" : "none";
      };
    });
  }
}
window.Accordion = Accordion;