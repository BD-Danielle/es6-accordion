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
  get index(){
    return 0;
  }
  set index(value){
    this.index = value;
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
  get bool(){
    return false;
  }
  set bool(value){
    this.bool = value;
  }
  toggle(auto, index){
    let btn, content;
    if(index) {
      this.buttons[index-1].setAttribute("data-toggle-btn", true);
      this.contents[index-1].style.display="block";
    }
    for(let i=0; i<this.items.length; i++){
      this.items[i].onclick=function(){
        btn = this.querySelector("[data-toggle-btn]");
        content = this.querySelector("[data-toggle-content]");
        console.log('index vs this.index', index, this.index);
        if(!this.index){
          this.index = index;
          console.log('index vs this.index: ', index, this.index);
          btn.setAttribute("data-toggle-btn", this.bool);
          content.style.display = this.bool ? "block": "none" ;
          this.bool = !this.bool;
          this.index = 0;
          return;
        }
        this.bool = !this.bool;
        btn.setAttribute("data-toggle-btn", this.bool);
        content.style.display = this.bool ? "block": "none";
      }
    }
  }
}
window.addEventListener("DOMContentLoaded", function(){
  let lists = document.querySelectorAll("[data-toggle-list]");
  lists.forEach(c=>new Accordion(c, true, 1));
})