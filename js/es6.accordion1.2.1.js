/*
 * ========================================================================
 * Accordion 1.2.1
 * Toggle Component
 * YILING CHEN.
 * Copyright 2023, MIT License
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
    this.cls = cls.length === 2 ? cls : ['a', 'b']; // Ensure cls has two elements
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
    const items = this.items;
    const buttons = this.buttons;
    const contents = this.contents;

    if (this.index < 0 || this.index >= items.length) {
      // If index is out of bounds, reset to 0
      this.index = 0;
    }
    const item = items[this.index];
    item.display = true;
    buttons[this.index].setAttribute("data-toggle-btn", item.display);
    contents[this.index].style.display = item.display ? "block" : "none";
    this.toggleClass(buttons[this.index].children[0].classList, item.display);
    

    items.forEach((item) => {
      const button = item.children[0];
      const content = item.children[1];

      item.onclick = () => {
        if (item.display && item.display === !this.collapsible) return;

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

// Usage example
const myAccordion = new Accordion({
  selector: document.getElementById("data-toggle-list"),
  auto: true, // Optional, whether to enable automatic switching (default is true)
  index: 9, // Optional, initial expanded item index (default starts from 0, returns 0 if the traversal length or -1 is exceeded)
  cls: ["fa-plus", "fa-minus"],  //Optional, the CSS class name of the button icon (the default is ["fa-plus", "fa-minus"], if null is filled in, the className will not be traversed)
  collapsible: true, // Optional, whether it is foldable or not
});