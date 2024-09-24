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
      index = null,
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

    if (this.index !== null && (this.index < 0 || this.index >= items.length)) {
      // 如果 index 超出範圍，重設為 null，表示所有項目關閉
      this.index = null;
    }
    // 初始化所有手風琴項為關閉狀態
    items.forEach((item, i) => {
      item.display = false;
      buttons[i].setAttribute("data-toggle-btn", item.display);
      contents[i].style.display = "none";
      this.toggleClass(buttons[i].children[0].classList, item.display);
    });

    // 如果傳入的 index 是有效的，打開對應的手風琴項
    if (this.index !== null) {
      const item = items[this.index];
      item.display = true;
      buttons[this.index].setAttribute("data-toggle-btn", item.display);
      contents[this.index].style.display = item.display ? "block" : "none";
      this.toggleClass(buttons[this.index].children[0].classList, item.display);
    }

    // 綁定點擊事件
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