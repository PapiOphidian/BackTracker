const BackTracker = require("../dist/index.js").BackTracker;

function epic() {
	console.log("Okay. This is epic.");
	console.log(BackTracker.stack.first());
}

module.exports = epic;
