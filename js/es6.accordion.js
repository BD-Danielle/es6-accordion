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
  toggleClass(classList, a, b){
    if([...classList].indexOf(a) == -1){
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
    if(index) {
      buttons[index-1].setAttribute("data-toggle-btn", true);
      contents[index-1].style.display="block";
      this.toggleClass(buttons[index-1].children[0].classList, "fa-minus", "fa-plus");
    }
    for(let i=0; i<this.items.length; i++){
      this.items[i].bool = false;
      this.items[i].index = i;
      this.items[i].onclick=function(){
        btn = this.children[0];
        content = this.children[1];
        if(auto) {
          contents.forEach(c=>c.style.display="none");
          buttons.forEach(c=>{
            if(c.getAttribute("data-toggle-btn")=="true") self_toggle.toggleClass(c.children[0].classList, "fa-minus", "fa-plus");
            c.setAttribute("data-toggle-btn", false);
          })
        }
        if(this.index == index - 1) {
          btn.setAttribute("data-toggle-btn", this.bool);
          self_toggle.toggleClass(btn.children[0].classList, "fa-plus", "fa-minus");
          content.style.display = this.bool ? "block": "none";
          this.bool = !this.bool;
          return;
        }
        if(!this.bool){
          this.bool = true;
          btn.setAttribute("data-toggle-btn", this.bool);
          self_toggle.toggleClass(btn.children[0].classList, "fa-minus", "fa-plus");
          content.style.display = this.bool ? "block": "none";
        }else{
          this.bool = false;
          btn.setAttribute("data-toggle-btn", this.bool);
          self_toggle.toggleClass(btn.children[0].classList, "fa-plus", "fa-minus");
          content.style.display = this.bool ? "block": "none";
        }
      }
    }
  }
}
window.addEventListener("DOMContentLoaded", function(){
  let lists = document.querySelectorAll("[data-toggle-list]");
  lists.forEach(c=>new Accordion(c, true, 1));
})