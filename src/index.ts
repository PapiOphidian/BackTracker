import Caller from "./Caller";
import Stack from "./Stack";

const [evalreg, namedreg, anonymousreg, notnamedreg, somethingreg] = [
	/at eval \(eval at ([\w_.<>]*) \(([^*?"<>]*):(\d+):(\d+)\),? ?(?:[^:]+:\d+:\d+)?\)/, // expression for global.eval
	/at (async)? ?([\w_.<>]+)? \(([^*?"<>]*):(\d+):(\d+)\)/, // expression for named scopes
	/at (.[\w_.<>]*)? ?\((<anonymous>)\)/, // expression for anonymous scopes
	/at ([^*?"<>]*):(\d+):(\d+)/, // expression for scopes not named
	/((?:.[\w_.<>]*)? ?(?:.[\w_.<>]*)? ?\[(?:as)? ?(?:.[\w_.<>]*)\])? ?\(([^*?"<>]*):(\d+):(\d+)\)/ // expression for something??? I'm not sure what to call it tbh.
];

class BackTracker {
	public parent: Caller;

	public constructor() {
		this.parent = BackTracker.stack.first;
	}

	public static get stack() {
		const stack = new Error().stack;
		const callers = new Stack();
		if (!stack) {
			callers.push(new Caller({ path: __dirname, async: false, scope: "root", line: 0, column: 0, anonymous: true }));
			return callers;
		}

		const split = stack.split("\n");
		const frames = split.slice(3, split.length).map(item => item.trim());

		for (const frame of frames) {
			const test1 = evalreg.exec(frame);

			if (test1 && test1.length > 0) {
				callers.push(new Caller({ path: test1[2], async: false, scope: test1[1], line: Number(test1[3]), column: Number(test1[4]), anonymous: test1[5] ? true : false }));
				continue;
			}

			const test2 = somethingreg.exec(frame);
			if (test2 && test2.length > 0) {
				callers.push(new Caller({ path: test2[2], async: false, scope: test2[1], line: Number(test2[3]), column: Number(test2[4]), anonymous: false }));
				continue;
			}

			const test3 = namedreg.exec(frame);
			if (test3 && test3.length > 0) {
				callers.push(new Caller({ path: test3[3], async: test3[1] ? true : false, scope: test3[2], line: Number(test3[4]), column: Number(test3[5]), anonymous: false }));
				continue;
			}

			const test4 = anonymousreg.exec(frame);
			if (test4 && test4.length > 0) {
				callers.push(new Caller({ path: test4[2], async: false, scope: test4[1], line: 0, column: 0, anonymous: true }));
				continue;
			}

			const test5 = notnamedreg.exec(frame);
			if (test5 && test5.length > 0) {
				callers.push(new Caller({ path: test5[1], async: false, scope: "root", line: Number(test5[2]), column: Number(test5[3]), anonymous: false }));
			}
		}

		for (const caller of callers) {
			const index = callers.indexOf(caller);
			caller.parent = callers[index + 1] ? callers[index + 1] : null;
		}

		return callers;
	}
}

export = {
	BackTracker,
	Caller,
	Stack
}
