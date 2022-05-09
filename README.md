# Accordion
## 手風琴套件，對於內文可折疊或展開。

## 必要條件：
### Accordion 不依賴原生jQuery，引用之前無需載入jQuery
```
<script src="./js/es6.accordion.js">
```

## 參數配置：
### 在父級創建屬性節點 data-toggle-list，被操控節點分別添加個別屬性
```
<ul class="list" data-toggle-list>
  <li class="item" data-toggle-item>
    <button data-toggle-btn class="w-100 p-3 d-flex justify-content-between text-white">YouTube 是什麼？<i
        class="fas fa-plus"></i></button>
    <div data-toggle-content class="content p-3">源自美國的影片分享網站，也是目前全球最大的影片搜尋和分享平臺，讓使用者上載、觀看、分享及評論影片。</div>
  </li>
  <li>.......</li>
</ul>
```
### 建立物件，行參一：為目標節點(@String)，行參二：為行為導向 屬性值為 true 可自動關閉，false 則為手動關閉(@Boolean)，行參三：為預設展開下標值(@Number)，行參四：為class名稱(@Array)。
```
<script>
  window.addEventListener('DOMContentLoaded', function(){ new Accordion('[data-toggle-list]', true, 1); })
</script>
```
