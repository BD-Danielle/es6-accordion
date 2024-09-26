class Accordion {
  constructor(config) {
    const {
      container, // selector -> container: 更直觀地表示這是手風琴組件的容器
      autoCollapse = true, // auto -> autoCollapse: 更清楚地表示自動折疊其他項目的功能
      defaultOpenIndex = 0, // index -> defaultOpenIndex: 明確這是預設展開的項索引
      toggleIcons = ["fa-plus", "fa-minus"], // cls -> toggleIcons: 更直觀地表示這是用來切換圖示的類別名
      allowCollapseAll = true, // collapsible -> allowCollapseAll: 明確表示是否允許所有項折疊
      onToggleItem = null, // onToggle -> onToggleItem: 更明確這是在項目切換時觸發的回調
      onItemOpen = null, // onOpen -> onItemOpen: 明確表示這是在項目開啟時觸發的回調
      onItemClose = null // onClose -> onItemClose: 明確表示這是在項目關閉時觸發的回調
    } = config;

    this.container = container;
    this.autoCollapse = autoCollapse;
    this.defaultOpenIndex = defaultOpenIndex;
    this.toggleIcons = toggleIcons.length === 2 ? toggleIcons : ['a', 'b'];
    this.allowCollapseAll = allowCollapseAll;
    this.onToggleItem = onToggleItem;
    this.onItemOpen = onItemOpen;
    this.onItemClose = onItemClose;

    this.initialize();
  }

  get items() {
    return this.container.querySelectorAll("[data-accordion-item]");
  }

  get buttons() {
    return this.container.querySelectorAll("[data-accordion-button]");
  }

  get contents() {
    return this.container.querySelectorAll("[data-accordion-content]");
  }

  toggleClass(classList, isOpen) {
    const [iconClosed, iconOpen] = this.toggleIcons;
    if (isOpen) {
      classList.add(iconOpen);
      classList.remove(iconClosed);
    } else {
      classList.add(iconClosed);
      classList.remove(iconOpen);
    }
  }

  initialize() {
    const items = this.items;
    const buttons = this.buttons;
    const contents = this.contents;

    if (this.defaultOpenIndex < 0 || this.defaultOpenIndex >= items.length) {
      this.defaultOpenIndex = 0;
    }

    items.forEach((item, index) => {
      const isOpen = index === this.defaultOpenIndex;
      item.isOpen = isOpen;
      buttons[index].setAttribute("data-accordion-button", isOpen);
      contents[index].style.display = isOpen ? "block" : "none";
      this.toggleClass(buttons[index].children[0].classList, isOpen);

      if (isOpen && this.onItemOpen) this.onItemOpen(index);
      if (!isOpen && this.onItemClose) this.onItemClose(index);
    });

    items.forEach((item, index) => {
      const button = item.children[0];
      const content = item.children[1];

      item.onclick = () => {
        if (item.isOpen && !this.allowCollapseAll) return;

        if (this.autoCollapse) {
          items.forEach((itm, idx) => {
            if (itm.isOpen && idx !== index) {
              itm.isOpen = false;
              buttons[idx].setAttribute("data-accordion-button", false);
              contents[idx].style.display = "none";
              this.toggleClass(buttons[idx].children[0].classList, false);
              if (this.onItemClose) this.onItemClose(idx);
            }
          });
        }

        item.isOpen = !item.isOpen;
        button.setAttribute("data-accordion-button", item.isOpen);
        this.toggleClass(button.children[0].classList, item.isOpen);
        content.style.display = item.isOpen ? "block" : "none";

        if (this.onToggleItem) this.onToggleItem(index, item.isOpen);
        if (item.isOpen && this.onItemOpen) this.onItemOpen(index);
        if (!item.isOpen && this.onItemClose) this.onItemClose(index);
      };
    });
  }

  addItem(htmlString) {
    this.container.insertAdjacentHTML('beforeend', htmlString);
    this.initialize();
  }

  removeItem(index) {
    const item = this.items[index];
    if (item) {
      item.remove();
      this.initialize();
    }
  }
}

window.Accordion = Accordion;