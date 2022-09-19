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
  constructor(selector, auto=false, index=0, cls=["fa-plus", "fa-minus"], collapsible=true){
    self_toggle = this;
    this.selector = selector;
    this.play(auto, index, cls, collapsible);
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
    if(bool){
      classList.add(b);
      classList.remove(a);
      return;
    }
    classList.add(a);
    classList.remove(b);
  }
  play(auto, index, cls, collapsible){
    let btn, content, buttons, contents, items;
    contents = this.contents;
    buttons = this.buttons;
    items = this.items;
    items.forEach(c=>c.display=false);
    buttons.forEach(c=>c.setAttribute("data-toggle-btn", false));
    if(!!index) {
      items[index-1].display=true;
      buttons[index-1].setAttribute("data-toggle-btn", items[index-1].display);
      contents[index-1].style.display=items[index-1].display? "block": "none";
      this.toggleClass(buttons[index-1].children[0].classList, cls[0], cls[1], items[index-1].display);
    }
    for(let i=0; i<items.length; i++){
      items[i].onclick=function(){
        if(this.display == true && this.display == !collapsible) return;
        btn = this.children[0];
        content = this.children[1];
        if(auto) {
          buttons.forEach((c, i)=>{
            if(c.getAttribute("data-toggle-btn")=="true"){
              self_toggle.toggleClass(c.children[0].classList, cls[0], cls[1], false);
              c.setAttribute("data-toggle-btn", false);
              contents[i].style.display="none"; // c.nextElementSibling.style.display="none";
              items[i].display=this.display; // c.parentNode.display=this.display;
            }
          })
        }
        this.display = !this.display;
        btn.setAttribute("data-toggle-btn", this.display);
        self_toggle.toggleClass(btn.children[0].classList, cls[0], cls[1], this.display);
        content.style.display = this.display ? "block": "none";
      }
    }
  }
}