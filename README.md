# markdown-it-to-text

Adapted from https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.js

Does all the logic the renderer does except for the part where it prints the tags!

## Usage

takes the result of `.parse()` from markdown-it:

```js
  const md = require('markdown-it')();
  let tokens = md.parse(source);
  renderAsText(tokens);
```
