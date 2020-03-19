const Caller = require("./Caller.js");

const [evalreg, namedreg, anonymousreg, notnamedreg] = [
	/at eval \(eval at ([^(]+) \(([^?]+):(\d+):(\d+)\),? ?(?:[^:]+:\d+:\d+)?\)/g,
	/at (async)? ?(.[^(]*)? \((.[^(]*):(\d+):(\d+)\)/g,
	/at (.*)? ?\((<anonymous>)\)/g,
	/at (.[^(]*):(\d+):(\d+)/g
];

class BackTracker {
	constructor() {
		this.constructedBy = BackTracker.calledBy[0];
	}
	static get calledBy() {
		/** @type {string} */
		const stack = new capture().stack;
		const split = stack.split("\n");
		const frames = split.slice(1, split.length).map(item => item.trim());
		const callers = [];
		for (const frame of frames) {
			const test1 = evalreg.exec(frame);
			if (test1 && test1.length > 0) {
				callers.push(new Caller({ filename: test1[2], async: false, scope: test1[1], line: Number(test1[3]), column: Number(test1[4]) }));
				continue;
			}

			const test2 = namedreg.exec(frame);
			if (test2 && test2.length > 0) {
				callers.push(new Caller({ filename: test2[3], async: test2[1] ? true : false, scope: test2[2], line: Number(test2[4]), column: Number(test2[5]) }));
				continue;
			}

			const test3 = anonymousreg.exec(frame);
			if (test3 && test3.length > 0) {
				callers.push(new Caller({ filename: test3[2], async: false, scope: test3[1], line: 0, column: 0 }));
				continue;
			}

			const test4 = notnamedreg.exec(frame);
			if (test4 && test4.length > 0) {
				callers.push(new Caller({ filename: test4[1], async: false, scope: "root", line: Number(test4[2]), column: Number(test4[3]) }));
				continue;
			}
		}
		return callers.slice(1, callers.length);
	}
}

module.exports = BackTracker;

function capture() {
	// @ts-ignore
	Error.captureStackTrace(this, capture);
}
