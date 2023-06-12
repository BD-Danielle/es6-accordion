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
  constructor(selector, auto = false, index = 0, cls = ["fa-plus", "fa-minus"], collapsible = true) {
    this.selector = selector;
    this.play(auto, index, cls, collapsible);
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

  toggleClass(classList, a, b, bool) {
    if (bool) {
      classList.add(b);
      classList.remove(a);
    } else {
      classList.add(a);
      classList.remove(b);
    }
  }

  play(auto, index, cls, collapsible) {
    const { contents, buttons, items } = this;

    items.forEach(item => item.display = false);
    buttons.forEach(btn => btn.setAttribute("data-toggle-btn", false));

    if (index) {
      const selectedItem = items[index - 1];
      selectedItem.display = true;
      buttons[index - 1].setAttribute("data-toggle-btn", selectedItem.display);
      contents[index - 1].style.display = selectedItem.display ? "block" : "none";
      this.toggleClass(buttons[index - 1].children[0].classList, cls[0], cls[1], selectedItem.display);
    }

    items.forEach(item => {
      item.onclick = () => {
        if (item.display && item.display === !collapsible) return;

        const btn = item.children[0];
        const content = item.children[1];

        if (auto) {
          buttons.forEach((btn, i) => {
            if (btn.getAttribute("data-toggle-btn") === "true") {
              this.toggleClass(btn.children[0].classList, cls[0], cls[1], false);
              btn.setAttribute("data-toggle-btn", false);
              contents[i].style.display = "none";
              items[i].display = item.display;
            }
          });
        }

        item.display = !item.display;
        btn.setAttribute("data-toggle-btn", item.display);
        this.toggleClass(btn.children[0].classList, cls[0], cls[1], item.display);
        content.style.display = item.display ? "block" : "none";
      };
    });
  }
}
