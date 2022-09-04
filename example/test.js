const BackTracker = require("../dist/index.js").BackTracker;

function epic() {
	console.log("Okay. This is epic.");
	console.log(require("util").inspect(BackTracker.stack.first(), true, 100, true));
}

module.exports = epic;
