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
let self_toggle;
class Accordion{
  constructor(selector, auto=false, index=0){
    self_toggle = this;
    this.selector = selector;
    this.toggle(auto, index);
  }
  get items(){
    return this.selector.querySelectorAll("[data-toggle-item]");
  }
  get buttons(){
    return this.selector.querySelectorAll("[data-toggle-btn]");
  }
  get contents(){
    return this.selector.querySelectorAll("[data-toggle-content]");
  }
  toggleClass(classList, a, b, bool){
    if(!bool){
      classList.add(a);
      classList.remove(b);
      return;
    }
    classList.add(b);
    classList.remove(a);
  }
  toggle(auto, index){
    let btn, content, buttons, contents;
    contents = this.contents;
    buttons = this.buttons;
    buttons.forEach(c=>c.setAttribute("data-toggle-btn", false));
    if(!!index) {
      buttons[index-1].setAttribute("data-toggle-btn", true);
      contents[index-1].style.display="block";
      this.toggleClass(buttons[index-1].children[0].classList, "fa-plus", "fa-minus", true);
    }
    for(let i=0; i<this.items.length; i++){
      this.items[i].bool = false;
      this.items[i].index = i;
      this.items[i].times = 0;
      this.items[i].onclick=function(){
        btn = this.children[0];
        content = this.children[1];
        this.times+=1;
        if(auto) {
          contents.forEach(c=>c.style.display="none");
          buttons.forEach(c=>{
            self_toggle.toggleClass(c.children[0].classList, "fa-plus", "fa-minus", false);
            c.setAttribute("data-toggle-btn", false);
          })
        }
        if(this.index == index - 1) {
          this.bool = this.times == 1 ? false: !this.bool;
          btn.setAttribute("data-toggle-btn", this.bool);
          self_toggle.toggleClass(btn.children[0].classList, "fa-plus", "fa-minus", this.bool);
          content.style.display = this.bool ? "block": "none";
          console.log('this.bool: ', this.bool);
          return;
        }
        this.bool = this.times%2 == 0 && btn.getAttribute("data-toggle-btn") == "false" ? false: true;
        btn.setAttribute("data-toggle-btn", this.bool);
        self_toggle.toggleClass(btn.children[0].classList, "fa-plus", "fa-minus", this.bool);
        content.style.display = this.bool ? "block": "none";
        console.log('this.times: ', this.times);
      }
    }
  }
}
window.addEventListener("DOMContentLoaded", function(){
  let lists = document.querySelectorAll("[data-toggle-list]");
  lists.forEach(c=>new Accordion(c, true, 1));
})