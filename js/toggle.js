/*
 * ========================================================================
 * ToggleItems 1.0
 * vertical accordion & content toggle component.
 * YILING CHEN.
 * Copyright 2020, MIT License.
 * How to use it:
 * // <ul data-toggle-list>
 * //  <li>
 * //    <button><i></i></button>
 * //    <div></div>
 * //  </li>
 * // </ul>
 * window.addEventListener('DOMContentLoaded', function(){ 
 * new Accordion('[data-toggle-list]', true); });
 * the second arg represents the toggle way of one to one(false) 
 * or one to more(true).
 * How to customize it(depreciated):
 * only classes and animate can be customized before the class initialize
 * ========================================================================
 */

 // Create a class
 class Accordion{
  // **********Static variables********** //
  constructor(selector, bool, index){
    // Default values
    let dom = Array.prototype.slice.call(document.querySelectorAll(selector));
    let len = dom ? dom.length : 0;
    for(let i = 0; i < len; i++){
      this[i] = dom[i];
      this.element = this[i];
      this.play(bool, index);
    }
  }
  replace(ele, a, b) {
    if (ele.contains(a)) {
        ele.add(b);
        ele.remove(a);
        return true;
    }
    return false;
  }
  toggleClass(ele){
    ele.classList.contains('fa-plus') ? this.replace(ele.classList, 'fa-plus', 'fa-minus') : this.replace(ele.classList, 'fa-minus', 'fa-plus');
  }
  toggleContent(ele){
    ele.offsetHeight == 0 ? ele.style.display = 'block' : ele.style.display = 'none';
  }
  play(bool, index){
    let items = this.element.children;
    let _this = this;
    let idx;
    setTimeout(function(){ if (index !== undefined) items[index - 1].click(); }, 100);
    for(let i = 0; i < items.length; i++){
      items[i].onclick = function(){
        Array.prototype.slice.call(this.parentNode.children).forEach(function(e, _i){
          if(idx == i || bool == false) return;
          e.children[0].children[0].classList.replace('fa-minus', 'fa-plus');
          e.children[1].style.display = 'none';
        })
        _this.toggleClass(this.children[0].lastElementChild);
        _this.toggleContent(this.children[1]);
        /*
 * ========================================================================
 * ToggleItems 1.0
 * vertical accordion & content toggle component.
 * YILING CHEN.
 * Copyright 2020, MIT License.
 * How to use it:
 * // <ul data-toggle-list>
 * //  <li>
 * //    <button><i></i></button>
 * //    <div></div>
 * //  </li>
 * // </ul>
 * window.addEventListener('DOMContentLoaded', function(){ 
 * new Accordion('[data-toggle-list]', true); });
 * the second arg represents the toggle way of one to one(false) 
 * or one to more(true).
 * How to customize it(depreciated):
 * only classes and animate can be customized before the class initialize
 * ========================================================================
 */

 // Create a class
 class Accordion{
  // **********Static variables********** //
  constructor(selector, bool, index){
    // Default values
    let dom = Array.prototype.slice.call(document.querySelectorAll(selector));
    let len = dom ? dom.length : 0;
    for(let i = 0; i < len; i++){
      this[i] = dom[i];
      this.element = this[i];
      this.play(bool, index);
    }
  }
  replace(ele, a, b) {
    if (ele.contains(a)) {
        ele.add(b);
        ele.remove(a);
        return true;
    }
    return false;
  }
  toggleClass(ele){
    ele.classList.contains('fa-plus') ? this.replace(ele.classList, 'fa-plus', 'fa-minus') : this.replace(ele.classList, 'fa-minus', 'fa-plus');
  }
  toggleContent(ele){
    ele.offsetHeight == 0 ? ele.style.display = 'block' : ele.style.display = 'none';
  }
  play(bool, index){
    let items = this.element.children;
    let _this = this;
    let idx;
    setTimeout(function(){ if (index !== undefined) items[index - 1].click(); }, 100);
    for(let i = 0; i < items.length; i++){
      items[i].onclick = function(){
        Array.prototype.slice.call(this.parentNode.children).forEach(function(e, _i){
          if(idx == i || bool == false) return;
          e.children[0].lastElementChild.classList.replace('fa-minus', 'fa-plus');
          e.children[1].style.display = 'none';
        })
        _this.toggleClass(this.children[0].lastElementChild);
        _this.toggleContent(this.children[1]);
        this.children[1].onclick = function(event){event.stopPropagation();};
        // window.scroll(0, this.offsetTop);
        idx = i;
      }
    }
  }
};

        // window.scroll(0, this.offsetTop);
        idx = i;
      }
    }
  }
};
