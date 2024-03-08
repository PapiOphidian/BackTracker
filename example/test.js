const { getStack } = require("../dist/index.js");

function epic() {
	console.log("Okay. This is epic.");
	console.log(require("util").inspect(getStack().first(), true, 100, true));
}

module.exports = epic;
