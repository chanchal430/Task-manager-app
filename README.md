# Task Manager DOM Project

A beginner-friendly Task Manager application built using HTML, CSS, and JavaScript for cohort 3.0.

## Features

- Add Tasks
- Edit Tasks
- Delete Tasks
- Complete Tasks
- Dark / Light Theme Toggle
- Local Storage Persistence
- Event Delegation
- Event Bubbling & Capturing Demo
- Browser Rendering Pipeline Visualization

## Screen Recording

A working demonstration of the project is available in the `screenrecording` folder.

---

# Browser Rendering Pipeline

## 1. Parsing

Parsing is the process where the browser reads HTML and CSS code and converts them into structures that it can understand.

Example:

```html
<h1>Hello World</h1>
```

The browser parses this HTML before displaying.

## 2. Tokenization

Tokenization breaks source code into units called tokens.

```html
<h1>Hello</h1>
```

Tokens: - Opening tag `<h1>` - Text: `Hello` - Closing tag: `<h1>`

These tokens are used to build the DOM Tree.

## 3. DOM Tree(Document Object Modal) is a tree like representation of HTML

Example:

```html
<body>
  <h1>Hello</h1>
</body>
```

DOM tree:

```html
Body 
    └── H1 
        └── Hello
```

Javascript doesn't changes directly in HTML is uses DOM to manipulate HTML.

## 4. CSSOM Tree

CSSOM (CSS Object Model) is created from CSS rules.

Example:

```html
h1 { color: blue; }
```
The browser converts CSS into a CSSOM Tree.

## 5. Render Tree

The browser combines:

    - DOM Tree
    - CSSOM Tree

to create the Render Tree.

The Render Tree contains Only visible elements that needs to be displayed on the screen.

## Event Propagation

Event Propagation describes how events travel through the DOM.

## Event Bubbling

Event starts from the target element and moves upward to its ancestors.

Example order:

```html
Child
Parent
Grandparent
```

Bubbling is the default behavior of JavaScript events.

## Event Capturing

Event starts from the root element and moves downward to the target element.

Example order:

```html
Grandparent
Parent
Child
```

Capturing is enabled using:

```element.addEventListener("click", handler, true);```

## Event Delegation

Event Delegation allows handling events on multiple child elements using a single event listener attached to parent element.

Example:

```html
tasksList.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete-btn')) {
        console.log('Deleted!')
    }
})
```

### Benefits:
    - Better Performance
    - Less Memory Usage
    - Works for dynamically added  element

## Technologies Used
    - HTML5
    - CSS3
    - JavaScript (DOM Manipulation)
    - Local Storage

