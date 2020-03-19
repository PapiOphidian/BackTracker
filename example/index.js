const epic = require("./test.js");

function notEpic(pog) {
	console.log(pog);
	epic();
}

notEpic("Not epic at all");
