# ES6 Accordion 手風琴組件 v1.2.2

ES6 Accordion 是一個簡潔、現代化的 JavaScript 手風琴組件，使用 ES6 類別語法編寫，讓您能夠輕鬆創建可摺疊的內容區塊。該組件提供了豐富的配置選項和事件回調，適合各種網頁場景使用。

## 目錄

- [ES6 Accordion 手風琴組件 v1.2.2](#es6-accordion-手風琴組件-v122)
  - [目錄](#目錄)
  - [特色功能](#特色功能)
  - [安裝](#安裝)
  - [DOM 結構要求](#dom-結構要求)
  - [基本使用](#基本使用)
  - [配置選項](#配置選項)
  - [方法](#方法)
  - [事件回調](#事件回調)
  - [完整範例](#完整範例)
  - [常見用法](#常見用法)
    - [1. 單一展開模式（傳統手風琴）](#1-單一展開模式傳統手風琴)
    - [2. 多項展開模式](#2-多項展開模式)
    - [3. 全部初始展開](#3-全部初始展開)
    - [4. 全部初始摺疊](#4-全部初始摺疊)
  - [CSS 樣式建議](#css-樣式建議)
  - [瀏覽器支援](#瀏覽器支援)
  - [授權](#授權)

## 特色功能

- ✨ **ES6 類別語法**：使用現代 JavaScript 編寫，代碼簡潔易讀
- 🎯 **自動圖標切換**：支援 FontAwesome 圖標自動切換（fa-plus ↔ fa-minus）
- 🔧 **豐富配置選項**：支援多種使用場景的配置
- 📱 **響應式設計**：適合各種螢幕尺寸
- 🎪 **事件回調**：提供開啟、關閉、切換等事件回調
- 🚀 **動態操作**：支援動態新增和移除手風琴項目
- 🎨 **自訂樣式**：容易整合現有的 CSS 樣式

## 安裝

在您的 HTML 文件中引入腳本：

```html
<!-- 方式 1：使用打包版本 -->
<script src="./js/webpack/es6.accordion.bundle1.2.2.js"></script>

<!-- 方式 2：使用原始檔案 -->
<script src="./js/es6.accordion1.2.2.js"></script>

<!-- FontAwesome（用於圖標） -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
```

## DOM 結構要求

ES6 Accordion 需要特定的 HTML 結構和 data 屬性：

```html
<div data-accordion-list>                    <!-- 手風琴容器 -->
  <div data-accordion-item>                  <!-- 手風琴項目 -->
    <div data-accordion-button>              <!-- 點擊按鈕區域 -->
      <span class="fa fa-plus"></span>       <!-- 圖標（必須是第一個子元素） -->
      <p>標題內容</p>
    </div>
    <div data-accordion-content>             <!-- 內容區域 -->
      <p>這裡是內容...</p>
    </div>
  </div>
  <!-- 更多項目... -->
</div>
```

⚠️ **重要提醒**：圖標元素（`<span class="fa fa-plus"></span>` 必須是 `data-accordion-button` 的第一個子元素，因為組件會操作 `children[0]` 來切換圖標類別。

## 基本使用

```javascript
document.addEventListener("DOMContentLoaded", function() {
  const accordionContainer = document.querySelector('[data-accordion-list]');
  
  const accordion = new Accordion({
    container: accordionContainer,  // 容器元素
    autoCollapse: true,            // 自動摺疊其他項目
    defaultOpenIndex: 0,           // 預設展開第一個項目
    toggleIcons: ["fa-plus", "fa-minus"], // 圖標切換
    allowCollapseAll: true         // 允許所有項目摺疊
  });
});
```

## 配置選項

| 選項 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `container` | Element | **必填** | 手風琴組件的容器元素 |
| `autoCollapse` | Boolean | `true` | 點擊時是否自動摺疊其他項目 |
| `defaultOpenIndex` | Number\|null | `0` | 預設展開的項目索引（null 表示全部摺疊） |
| `toggleIcons` | Array | `["fa-plus", "fa-minus"]` | 圖標切換的 CSS 類別名稱 |
| `allowCollapseAll` | Boolean | `true` | 是否允許所有項目都摺疊 |
| `onToggleItem` | Function\|null | `null` | 項目切換時的回調函數 |
| `onItemOpen` | Function\|null | `null` | 項目開啟時的回調函數 |
| `onItemClose` | Function\|null | `null` | 項目關閉時的回調函數 |

## 方法

### `addItem(htmlString)`
動態新增手風琴項目

```javascript
accordion.addItem(`
  <div data-accordion-item>
    <div data-accordion-button>
      <span class="fa fa-plus"></span>
      <p>新的標題</p>
    </div>
    <div data-accordion-content>
      <p>新的內容</p>
    </div>
  </div>
`);
```

### `removeItem(index)`
移除指定索引的手風琴項目

```javascript
accordion.removeItem(0); // 移除第一個項目
```

## 事件回調

```javascript
const accordion = new Accordion({
  container: accordionContainer,
  onToggleItem: (index, isOpen) => {
    console.log(`項目 ${index + 1} 現在${isOpen ? '展開' : '摺疊'}`);
  },
  onItemOpen: (index) => {
    console.log(`項目 ${index + 1} 已開啟`);
  },
  onItemClose: (index) => {
    console.log(`項目 ${index + 1} 已關閉`);
  }
});
```

## 完整範例

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ES6 Accordion 範例</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
  <style>
    .common_qa_title {
      background: #f8f9fa;
      border: 1px solid #dee2e6;
      padding: 15px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .common_qa_con {
      padding: 15px;
      border-left: 1px solid #dee2e6;
      border-right: 1px solid #dee2e6;
      border-bottom: 1px solid #dee2e6;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>常見問題</h1>
    
    <div data-accordion-list>
      <div data-accordion-item>
        <div class="common_qa_title" data-accordion-button>
          <span class="fa fa-plus"></span>
          <p>什麼是 ES6 Accordion？</p>
        </div>
        <div class="common_qa_con" data-accordion-content>
          <p>ES6 Accordion 是一個使用現代 JavaScript 編寫的手風琴組件，提供豐富的配置選項和流暢的使用體驗。</p>
        </div>
      </div>
      
      <div data-accordion-item>
        <div class="common_qa_title" data-accordion-button>
          <span class="fa fa-plus"></span>
          <p>如何使用？</p>
        </div>
        <div class="common_qa_con" data-accordion-content>
          <p>只需要按照指定的 DOM 結構建立 HTML，然後使用 JavaScript 初始化組件即可。</p>
        </div>
      </div>
    </div>
  </div>

  <script src="./js/es6.accordion1.2.2.js"></script>
  <script>
    document.addEventListener("DOMContentLoaded", function() {
      const accordion = new Accordion({
        container: document.querySelector('[data-accordion-list]'),
        autoCollapse: true,
        defaultOpenIndex: 0,
        toggleIcons: ["fa-plus", "fa-minus"],
        allowCollapseAll: true,
        onToggleItem: (index, isOpen) => {
          console.log(`FAQ ${index + 1} is now ${isOpen ? 'open' : 'closed'}`);
        }
      });
    });
  </script>
</body>
</html>
```

## 常見用法

### 1. 單一展開模式（傳統手風琴）
```javascript
const accordion = new Accordion({
  container: accordionContainer,
  autoCollapse: true,      // 自動摺疊其他項目
  defaultOpenIndex: 0,     // 預設展開第一個
  allowCollapseAll: false  // 不允許全部摺疊
});
```

### 2. 多項展開模式
```javascript
const accordion = new Accordion({
  container: accordionContainer,
  autoCollapse: false,     // 不自動摺疊
  defaultOpenIndex: 0,     // 預設展開第一個
  allowCollapseAll: true   // 允許全部摺疊
});
```

### 3. 全部初始展開
```javascript
const accordion = new Accordion({
  container: accordionContainer,
  autoCollapse: false,     // 不自動摺疊
  defaultOpenIndex: 0      // 預設展開第一個
});

// 初始化後展開其他項目
const items = accordionContainer.querySelectorAll('[data-accordion-item]');
items.forEach((item, index) => {
  if (index > 0) {
    item.click(); // 模擬點擊展開
  }
});
```

### 4. 全部初始摺疊
```javascript
const accordion = new Accordion({
  container: accordionContainer,
  autoCollapse: true,
  defaultOpenIndex: null,  // 全部摺疊
  allowCollapseAll: true
});
```

## CSS 樣式建議

```css
/* 基本樣式 */
[data-accordion-button] {
  cursor: pointer;
  transition: background-color 0.3s ease;
}

[data-accordion-button]:hover {
  background-color: #f8f9fa;
}

[data-accordion-content] {
  transition: all 0.3s ease;
}

/* 圖標樣式 */
.fa-plus, .fa-minus {
  transition: transform 0.3s ease;
}

/* 響應式設計 */
@media (max-width: 768px) {
  [data-accordion-button] {
    padding: 10px;
    font-size: 14px;
  }
}
```

## 瀏覽器支援

- Chrome 60+
- Firefox 55+
- Safari 10+
- Edge 79+
- IE 不支援（需要 Babel 轉譯）

## 授權

本專案採用 [MIT 授權](LICENSE)。© 2023 Yiling Chen.

---

## 更新日誌

### v1.2.2
- 改善參數命名的可讀性
- 優化事件回調機制
- 新增動態新增/移除項目的功能
- 完善錯誤處理

### v1.2.1
- 修正圖標切換邏輯
- 改善初始化流程

### v1.2.0
- 重構為 ES6 類別語法
- 新增事件回調功能
