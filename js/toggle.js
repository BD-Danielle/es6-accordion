/*
 * ========================================================================
 * ToggleItems 1.0
 * vertical accordion & content toggle component on the website
 * YILING CHEN
 * Copyright 2020, MIT License
 * How to use it:
 * <ul data-toggle-list>
 *  <li>
 *    <button><i></i></button>
 *    <div></div>
 *  </li>
 * </ul>
 * How to customize it:
 * only classes and animate can be customized before the class initialize
 * ========================================================================
 */

 // Create a class
class Accordion{
  // **********Static variables********** //
  classes = 'closed open';
  constructor(selector){
    // Default values
    let dom = Array.prototype.slice.call(document.querySelectorAll(selector));
    let len = dom ? dom.length : 0;
    for(let i = 0; i < len; i++){
      this[i] = dom[i];
      this.element = this[i];
      this.play();
    }
  }
  toggleClass(ele){
    ele.classList.contains('fa-plus') ? ele.classList.replace('fa-plus', 'fa-minus') : ele.classList.replace('fa-minus', 'fa-plus');
  }
  toggleContent(ele){
    ele.offsetHeight == 0 ? ele.style.display = 'block' : ele.style.display = 'none';
  }
  play(){
    let items = this.element.children;
    let _this = this;
    let idx;
    for(let i = 0; i < items.length; i++){
      items[i].onclick = function(){
        Array.prototype.slice.call(this.parentNode.children).forEach(function(e, _i){
          if(idx == i) return;
          e.children[0].children[0].classList.replace('fa-minus', 'fa-plus');
          e.children[1].style.display = 'none';
        })
        _this.toggleClass(this.children[0].children[0]);
        _this.toggleContent(this.children[1]);
        window.scroll(0, this.offsetTop);
        idx = i;
      }
    }
  }
};
window.addEventListener('DOMContentLoaded', function(){ new Accordion('[data-toggle-list]'); })
