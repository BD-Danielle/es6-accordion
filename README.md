# Accordion 1.2.1 - Toggle Component

Accordion is a simple JavaScript toggle component that allows you to create collapsible content sections with ease. It provides a customizable solution for implementing accordions on your web page.

## Table of Contents

- [Accordion 1.2.1 - Toggle Component](#accordion-121---toggle-component)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Or](#or)
  - [Options](#options)
  - [Example](#example)
  - [License](#license)

## Installation

To use Accordion in your project, include the script in your HTML file:

```html
<script src="path/to/accordion.js"></script>
```

## Usage

To create an instance of the Accordion, instantiate it with the desired options:

```javascript
const myAccordion = new Accordion({
  selector: document.getElementById("data-toggle-list"),
  auto: true, // Optional, whether to enable automatic switching (default is true)
  index: 0, // Optional, initial expanded item index (default starts from 0)
  cls: ["fa-plus", "fa-minus"], // Optional, the CSS class name of the button icon (default is ["fa-plus", "fa-minus"])
  collapsible: true, // Optional, whether it is foldable or not
});
```
### Or
```javascript
const myAccordions = document.querySelectorAll(".data-toggle-list");
myAccordions.forEach(c => new Accordion({
  selector: c, 
  //auto: true,
  index: 9,
  //cls: null,
  collapsible: true
}));
```
## Options

- `selector` (required): The DOM element containing the accordion items.
- `auto` (optional): Whether to enable automatic switching (default is true).
- `index` (optional): Initial expanded item index (default starts from 0).
- `cls` (optional): The CSS class names of the button icon (default is ["fa-plus", "fa-minus"]).
- `collapsible` (optional): Whether the accordion is collapsible (default is true).

## Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Accordion Example</title>
  <link rel="stylesheet" href="path/to/font-awesome.css">
  <script src="path/to/accordion.js"></script>
</head>
<body>

<div id="data-toggle-list">
  <div data-toggle-item>
    <button data-toggle-btn><i class="fa fa-plus"></i> Section 1</button>
    <div data-toggle-content>
      <!-- Content for Section 1 -->
    </div>
  </div>
  <!-- Add more accordion items as needed -->
</div>

<script>
  const myAccordion = new Accordion({
    selector: document.getElementById("data-toggle-list"),
    auto: true,
    index: 0,
    cls: ["fa-plus", "fa-minus"],
    collapsible: true,
  });
</script>

</body>
</html>
```

## License
Accordion is licensed under the [MIT License](LICENSE). © 2023 Yiling Chen.
