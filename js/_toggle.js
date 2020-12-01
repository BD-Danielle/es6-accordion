/*
 * ========================================================================
 * ToggleItems 1.0
 * vertical accordion & content toggle component on the website
 * YILING CHEN
 * Copyright 2020, MIT License
 * How to use it:
 * <ul data-toggle-list>
 *  <li data-toggle-item>
 *    <button data-toggle-btn><i></i></button>
 *    <div data-toggle-content></div>
 *  </li>
 * </ul>
 * How to customize it:
 * only classes and animate can be customized before the class initialize
 * ========================================================================
 */

 // Create a class
class Accordion{
  collectors = [];
  items;
  animate;

  // **********Static variables********** //
  classes = 'closed open';
  constructor(selector){
    // Default values
    var dom = Array.prototype.slice.call(document.querySelectorAll(selector));
    var len = dom ? dom.length : 0;
    for(var i = 0; i < len; i++){
      this[i] = dom[i];
      this.element = this[i];
      this.play();
    }
  }
  toggleClass(ele){
    ele.classList.contains('open') ? ele.classList.replace('open', 'closed') : ele.classList.replace('closed', 'open');
  }
  toggleContent(ele){
    console.log(ele.style.display)
    ele.style.display == 'none' ? ele.style.display = 'block' : ele.style.display = 'none';
  }
  play(){
    var items = this.element.querySelectorAll('[data-toggle-item]');
    var _this = this;
    for(var i = 0; i < items.length; i++){
      items[i].onclick = function(){
        console.log(this.children[1])
        _this.toggleClass(this.children[0]);
        _this.toggleContent(this.children[1]);
      }
    }
    
  }
};
window.addEventListener('DOMContentLoaded', function(){ new Accordion('[data-toggle-list]'); })
