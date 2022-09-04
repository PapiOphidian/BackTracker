# BackTracker
Back track in JS code execution and find where a function was called

Some developers may find it necessary to know where the function is being called from for whatever reason. This can lead to some creative uses such as require-like file resolution where it takes the current file's path into consideration.

# How it works
In JavaScript, you can make use of Error stacks to peek back into code execution. This project abuses Error stacks and Error formatting. Previous versions used ugly and long regular expressions which were not infallible.
# Examples

## test.js
```js
const { BackTracker } = require("backtracker");

function epic() {
	console.log("Okay. This is epic.");
	console.log(BackTracker.stack.first()));
}

module.exports = epic;
```

## index.js
```js
const epic = require("./test.js");

function notEpic(pog) {
	console.log(pog);
	epic();
}

notEpic("Not epic at all");
```

Output example:
```js
'Not epic at all'
'Okay. This is epic.'
Frame {
  path: 'A:\\Windows\\Documents\\GitHub\\BackTracker\\example\\index.js',
  dir: 'A:\\Windows\\Documents\\GitHub\\BackTracker\\example',
  filename: 'index.js',
  async: false,
  scope: 'notEpic',
  line: 5,
  column: 2,
  anonymous: false,
  parent: Frame {
    path: 'A:\\Windows\\Documents\\GitHub\\BackTracker\\example\\index.js',
    dir: 'A:\\Windows\\Documents\\GitHub\\BackTracker\\example',
    filename: 'index.js',
    async: false,
    scope: '<anonymous>',
    line: 8,
    column: 1,
    anonymous: true,
    parent: Frame {
      path: 'node:internal/modules/cjs/loader',
      dir: 'node:internal/modules/cjs',
      filename: 'loader',
      async: false,
      scope: 'Module._compile',
      line: 1120,
      column: 14,
      anonymous: false,
      parent: Frame {
        path: 'node:internal/modules/cjs/loader',
        dir: 'node:internal/modules/cjs',
        filename: 'loader',
        async: false,
        scope: 'Module._extensions..js',
        line: 1174,
        column: 10,
        anonymous: false,
        parent: Frame {
          path: 'node:internal/modules/cjs/loader',
          dir: 'node:internal/modules/cjs',
          filename: 'loader',
          async: false,
          scope: 'Module.load',
          line: 998,
          column: 32,
          anonymous: false,
          parent: Frame {
            path: 'node:internal/modules/cjs/loader',
            dir: 'node:internal/modules/cjs',
            filename: 'loader',
            async: false,
            scope: 'Module._load',
            line: 839,
            column: 12,
            anonymous: false,
            parent: Frame {
              path: 'node:internal/modules/run_main',
              dir: 'node:internal/modules',
              filename: 'run_main',
              async: false,
              scope: 'executeUserEntryPoint',
              line: 81,
              column: 12,
              anonymous: false,
              parent: Frame {
                path: 'node:internal/main/run_main_module',
                dir: 'node:internal/main',
                filename: 'run_main_module',
                async: false,
                scope: '<anonymous>',
                line: 17,
                column: 47,
                anonymous: true,
                parent: null
              }
            }
          }
        }
      }
    }
  }
}
```
