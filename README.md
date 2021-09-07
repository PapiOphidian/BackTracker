# BackTracker
Back track in JS code execution and find where a function was called

Some developers may find it necessary to know where the function is being called from for whatever reason. This can lead to some creative uses such as require-like file resolution where it takes the current file's path into consideration.

# How it works
In JavaScript, you can make use of Error stacks to peek back into code execution. This project makes use of Error stacks and analyses individual stack frames and tries it's best to pick apart the scope, absolute path of file, line and column of each frame via regular expressions so that this info is available in code rather than requiring a user to analyse the stack.

# Contributing
If you would like to contribute and modify the regular expressions, please open a Pull Request and I will test code changes against a dataset of stack frames including stack frames which you might want to add support for.

# Examples

## test.js
```js
const BackTracker = require("backtracker").BackTracker;

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

starting index.js logs the following
```
C:\Users\papi\Documents\GitHub\BackTracker>node example/index.js
Not epic at all
Okay. This is epic.
Caller {
  path: 'C:\\Users\\papi\\Documents\\GitHub\\BackTracker\\example\\index.js',
  dir: 'C:\\Users\\papi\\Documents\\GitHub\\BackTracker\\example',
  filename: 'index.js',
  async: false,
  scope: undefined,
  line: 5,
  column: 2,
  anonymous: false,
  parent: Caller {
    path: 'C:\\Users\\papi\\Documents\\GitHub\\BackTracker\\example\\index.js',
    dir: 'C:\\Users\\papi\\Documents\\GitHub\\BackTracker\\example',
    filename: 'index.js',
    async: false,
    scope: undefined,
    line: 8,
    column: 1,
    anonymous: false,
    parent: Caller {
      path: 'internal/modules/cjs/loader.js',
      dir: 'internal/modules/cjs',
      filename: 'loader.js',
      async: false,
      scope: undefined,
      line: 936,
      column: 30,
      anonymous: false,
      parent: [Caller]
    }
  }
}
```
