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
(function ($, window, document) {
  if(!$) throw newError('jquery is not defined');
  function ToggleItems() {
    // Default values
    this.collectors = [];
    this.items = null;
    this.active = 'active';
    this.index = null;
    this.classes = 'fa-minus fa-plus'
    this.animate = null;
  }
  // Release module to window
  window.ToggleItems = ToggleItems;
  // ToggleItems.prototype = Object.create(ToggleItems.prototype);
  // ToggleItems.prototype.constructor = ToggleItems;
  // Static variables
  ToggleItems.prototype.initCollectors = function (i, _i) {
    // Add object dynamically
    while (!this.collectors[i]) {
      this.collectors[i] = {}
    };
    while (!this.collectors[i][_i]) {
      this.collectors[i][_i] = {};
      if (!this.collectors[i][_i]['on'] && !this.collectors[i][_i]['times']) {
        this.collectors[i][_i]['on'] = false;
        this.collectors[i][_i]['times'] = 0;
      }
    }
    // return this.collectors[i];
  }
  ToggleItems.prototype.getAttribute = function(ele, key){
    return ele.getAttribute(key);
  }
  ToggleItems.prototype.setAttribute = function(ele, key, value){
    return ele.setAttribute(key, value);
  }
  ToggleItems.prototype.getIndex = function(ele, key){
    for(var i=0; i< ele.length; i++){
      if(this.getAttribute(ele[i], key) == this.active){
        return i;
      }
    }
  }
  ToggleItems.prototype.toggleClass = function (ele) {
    ele.toggleClass(this.classes);
  }
  ToggleItems.prototype.toggleContent = function (ele) {
    ele.toggle('slow', function(){
      if(!this.animate) return;
      $(this).animate(this.animate);
    });
  }
  ToggleItems.prototype.onclick = function (items, i, _this) {
    _this.items = $(items);
    _this.items.each(function (_i, ele) {
      var $this = $(ele);
      $this.find('[data-toggle-btn]').on('click', function () {
        //  get the last active index
        // var lastIdx = _this.getIndex(_this.items, 'data-toggle-item');
        // console.log(lastIdx);
        var _$this = $(this);
        // _this.setAttribute(_$this.parent().get(0), 'data-toggle-item', 'active');
        // var actIdx = _this.getIndex(_this.items, 'data-toggle-item');
        // console.log(actIdx);
        // if(lastIdx == actIdx) _this.setAttribute(_$this.parent(), 'data-toggle-item', '');
        // collectors structure
        // collectors = [
        //   {0:{bool: false, times: 0}, 
        //   1:{bool: false, times: 0}, 
        //   2:{bool: false, times: 0}, 
        //   3:{bool: false, times: 0}, 
        //   4:{bool: false, times: 0}},
        //   {0:{bool: false, times: 0}, 
        //   1:{bool: false, times: 0}, 
        //   2:{bool: false, times: 0}, 
        //   3:{bool: false, times: 0}, 
        //   4:{bool: false, times: 0}}
        // ]
        // turn off each contents in advance
        // _this.items.eq(lastIdx).find('[data-toggle-content]').hide('slow');
        _this.items.find('[data-toggle-content]').hide('slow');
        _this.initCollectors(i, _i);
        // 關閉非操作當下的 content
        // if(typeof lastIdx != 'undefined') _this.toggleContent(_this.items.eq(lastIdx).find('[data-toggle-content]').siblings());
        if (_this.collectors[i][_i]['on'] === false) {
          _this.toggleClass(_$this.children());
          _this.toggleContent(_$this.siblings());
          for (var collector in _this.collectors[i]) {
            if (collector == _i) continue;
            _this.collectors[i][collector]['on'] = false;
            if (_this.collectors[i][collector]['times'] >= 1 && _this.collectors[i][collector]['on'] == false) {
              _this.items.eq(collector).find('.fas.fa-minus').removeClass().addClass('fas fa-plus');
            }
          }
          _this.collectors[i][_i]['on'] = true;
          _this.collectors[i][_i]['times'] += 1;
          // console.log('toggle the different btn')
          // console.log(_this.collectors);
        } else {
          // toggle the same btn go here
          _this.toggleClass(_$this.children());
          // toggleContent(_$this.siblings());
          _this.collectors[i][_i]['on'] = false;
          _this.collectors[i][_i]['times'] -= 1;
          // console.log('toggle the same btn');
          // console.log(_this.collectors);
        }
      });

    });
  }
  ToggleItems.prototype.able = function (items, list, topPos) {
    this.onclick(items, list, this);
    $(window).scrollTop(topPos);
  }
  
  // window.addEventListener('DOMContentLoaded', function () {
    // Select all elements that has a data-toggle-item
    
  // })
})(jQuery, window, document);

$(function(){
  var lists = document.querySelectorAll('[data-toggle-list]');
  for (var list in lists) {
    if (lists.hasOwnProperty(list)) {
      var items = lists[list].querySelectorAll('[data-toggle-item]');
      var topPos = lists[list].offsetTop;
      var toggle = new ToggleItems();
      toggle.able(items, list, topPos || null);
    }
  }
})