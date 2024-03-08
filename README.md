# BackTracker
Back track in JS code execution and find where a function was called

Some developers may find it necessary to know where the function is being called from for whatever reason. This can lead to some creative uses such as require-like file resolution where it takes the current file's path into consideration.

# How it works
In JavaScript, you can make use of Error stacks to peek back into code execution. This project abuses Error stacks and Error formatting. Previous versions used ugly and long regular expressions which were not infallible.
# Examples

## test.js
```js
const { getStack } = require("backtracker");

function epic() {
	console.log("Okay. This is epic.");
	console.log(getStack().first());
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
{
  unparsed: 'at notEpic (A:\\Windows\\Documents\\GitHub\\BackTracker\\example\\index.js:5:2)',
  absolute: 'A:\\Windows\\Documents\\GitHub\\BackTracker\\example\\index.js',
  dir: 'A:\\Windows\\Documents\\GitHub\\BackTracker\\example',
  basename: 'index.js',
  async: false,
  scope: 'notEpic',
  line: 5,
  column: 2,
  anonymous: false,
  srcAbsolute: 'A:\\Windows\\Documents\\GitHub\\BackTracker\\example\\index.js',
  srcDir: 'A:\\Windows\\Documents\\GitHub\\BackTracker\\example',
  srcBasename: 'index.js',
  srcLine: 5,
  srcColumn: 2,
  parent: {
    unparsed: 'at Object.<anonymous> (A:\\Windows\\Documents\\GitHub\\BackTracker\\example\\index.js:8:1)',
    absolute: 'A:\\Windows\\Documents\\GitHub\\BackTracker\\example\\index.js',
    dir: 'A:\\Windows\\Documents\\GitHub\\BackTracker\\example',
    basename: 'index.js',
    async: false,
    scope: '<anonymous>',
    line: 8,
    column: 1,
    anonymous: true,
    srcAbsolute: 'A:\\Windows\\Documents\\GitHub\\BackTracker\\example\\index.js',
    srcDir: 'A:\\Windows\\Documents\\GitHub\\BackTracker\\example',
    srcBasename: 'index.js',
    srcLine: 8,
    srcColumn: 1,
    parent: {
      unparsed: 'at Module._compile (node:internal/modules/cjs/loader:1241:14)',
      absolute: 'node:internal/modules/cjs/loader',
      dir: 'node:internal/modules/cjs',
      basename: 'loader',
      async: false,
      scope: 'Module._compile',
      line: 1241,
      column: 14,
      anonymous: false,
      srcAbsolute: 'node:internal/modules/cjs/loader',
      srcDir: 'node:internal/modules/cjs',
      srcBasename: 'loader',
      srcLine: 1241,
      srcColumn: 14,
      parent: {
        unparsed: 'at Module._extensions..js (node:internal/modules/cjs/loader:1295:10)',
        absolute: 'node:internal/modules/cjs/loader',
        dir: 'node:internal/modules/cjs',
        basename: 'loader',
        async: false,
        scope: 'Module._extensions..js',
        line: 1295,
        column: 10,
        anonymous: false,
        srcAbsolute: 'node:internal/modules/cjs/loader',
        srcDir: 'node:internal/modules/cjs',
        srcBasename: 'loader',
        srcLine: 1295,
        srcColumn: 10,
        parent: {
          unparsed: 'at Module.load (node:internal/modules/cjs/loader:1091:32)',
          absolute: 'node:internal/modules/cjs/loader',
          dir: 'node:internal/modules/cjs',
          basename: 'loader',
          async: false,
          scope: 'Module.load',
          line: 1091,
          column: 32,
          anonymous: false,
          srcAbsolute: 'node:internal/modules/cjs/loader',
          srcDir: 'node:internal/modules/cjs',
          srcBasename: 'loader',
          srcLine: 1091,
          srcColumn: 32,
          parent: {
            unparsed: 'at Module._load (node:internal/modules/cjs/loader:938:12)',
            absolute: 'node:internal/modules/cjs/loader',
            dir: 'node:internal/modules/cjs',
            basename: 'loader',
            async: false,
            scope: 'Module._load',
            line: 938,
            column: 12,
            anonymous: false,
            srcAbsolute: 'node:internal/modules/cjs/loader',
            srcDir: 'node:internal/modules/cjs',
            srcBasename: 'loader',
            srcLine: 938,
            srcColumn: 12,
            parent: {
              unparsed: 'at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:83:12)',
              absolute: 'node:internal/modules/run_main',
              dir: 'node:internal/modules',
              basename: 'run_main',
              async: false,
              scope: 'executeUserEntryPoint',
              line: 83,
              column: 12,
              anonymous: false,
              srcAbsolute: 'node:internal/modules/run_main',
              srcDir: 'node:internal/modules',
              srcBasename: 'run_main',
              srcLine: 83,
              srcColumn: 12,
              parent: {
                unparsed: 'at node:internal/main/run_main_module:23:47',
                absolute: 'node:internal/main/run_main_module',
                dir: 'node:internal/main',
                basename: 'run_main_module',
                async: false,
                scope: '<anonymous>',
                line: 23,
                column: 47,
                anonymous: true,
                srcAbsolute: 'at node:internal/main/run_main_module',
                srcDir: 'at node:internal/main',
                srcBasename: 'run_main_module',
                srcLine: 23,
                srcColumn: 47,
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
