// adapted from https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.js
// takes the result of `.parse()` from markdown-it
// e.g. `renderAsText(md.parse(source))`
// does all the logic the renderer does except for the part where it prints the tags :)
function renderAsText(tokens) {
    let result = '';
    tokens.forEach((token, idx) => {
      if (token.type === 'inline') {
        result += renderAsText(token.children);
      } else if (token.type === 'text' ||
                 token.type === 'code_inline') {
        result += token.content;
      } else if(token.type === 'fence' ||
                token.type === 'code_block') {
        result += token.content + '\n';
      } else if (token.type === 'softbreak' ||
                 token.type === 'hardbreak') {
        result += '\n';
      } else if (!token.hidden) {
        if (token.block && token.nesting !== -1 && idx && tokens[idx - 1].hidden) {
          result += '\n';
        }
        let needLf = false;
        if (token.block) {
          needLf = true;
          if (token.nesting === 1) {
            let nextToken = tokens[idx + 1];
            if (nextToken) {
              if (nextToken.type === 'inline' || nextToken.hidden) {
                needLf = false;
              } else if (nextToken.nesting === -1 && nextToken.tag === token.tag) {
                needLf = false;
              }
            }
          }
        }
        if (needLf) {
          result += '\n';
        }  
      }
    });
    return result;
  }

  module.exports = renderAsText;