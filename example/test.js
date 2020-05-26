const BackTracker = require("../index.js").BackTracker;

function epic() {
	console.log("Okay. This is epic.");
	console.log(BackTracker.caller);
}

module.exports = epic;
