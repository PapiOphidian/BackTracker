# BackTracker
Back track in js code execution and find where a function was called

In applications which are in development and issues seem to come from seemingly no where such as things being undefined in an abstract tree of code execution, it'd be beneficial for developers to know where these issues are coming from and what steps your code is taking to get to said issues.

# Note
This project is still a work in progress. It's functionality is not guaranteed as the regular expressions used to capture stack details are not fool proof.

# Examples

## test.js
```js
const BackTracker = require("@amanda/back-tracker").BackTracker;

function epic() {
	console.log("Okay. This is epic.");
	console.log(BackTracker.calledBy));
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

Not epic at all
Okay. This is epic.
(and a few instances of Caller with relevant stack information)
