import Frame from "./Frame";
import Stack from "./Stack";

const [evalreg, anonymousreg, pallreg, scopereg] = [
	/^at eval \(eval a?t? ?([\w_\.<>]+)? ?\((?:file\:\/\/\/)?([^*"\)]+):(\d+):(\d+)\),? ?([\w_\.<>]+)?:\d+:\d+\)$/, // expression for global.eval
	/^at ([\w_\.<>]+)? ?\(?(<anonymous>)\)?$/, // expression for anonymous scopes
	/^at (?:async)? ?Promise.all \(index (\d+)\)$/, // expression for Promise.all
	/^at (async)? ?((?!\bfile\b|[A-Z]:)[\w_\.<> ]+)? ?(?:\[as ([\w_\.<> ]+)\])? ?\(?(?:file\:\/\/\/)?([^*"]+):(\d+):(\d+)\)?$/, // expression for named and unnamed scopes including functions that were renamed as well as getters
];

class BackTracker {
	public parent: Frame;

	public constructor() {
		this.parent = BackTracker.stack.first();
	}

	public static get stack() {
		const stack = new Error().stack;
		if (!stack) {
			const stackframes = new Stack()
			stackframes.push(new Frame({ path: __dirname || "backtracker:internal/index", async: false, scope: "stack", line: 22, column: 7, anonymous: false }));
			return stackframes;
		}

		const split = stack.split("\n");
		const frames = split.slice(3).map(item => item.trim()); // slice out the first 3 lines which is the Error message, BackTracker's frame, and the current frame which leaves you with the previous as the current is known
		return BackTracker.process(frames);
	}

	/**
	 * Process an Array of strings from an Error stack. The strings must be trimmed as the regular expressions specify string start and end.
	 * You can easily get what's required for this by doing the example provided.
	 *
	 * The slice is necessary because the Error name and message is included in the first line of the stack
	 * @param withParentReferences If each stack frame should have references to the previous frame added to itself
	 * @example BackTracker.process(new Error().stack.split("\n").slice(1).map(i => i.trim()))
	 */
	public static process(frames: Array<string>, withParentReferences = true): Stack {
		const stackframes = new Stack();

		for (const frame of frames) {
			const test1 = evalreg.exec(frame);
			if (test1 && test1.length) {
				stackframes.push(new Frame({ path: test1[2], async: false, scope: test1[1], line: Number(test1[3]), column: Number(test1[4]), anonymous: (!!test1[5] && test1[5].includes("<anonymous>")) }));
				continue;
			}

			const test2 = anonymousreg.exec(frame);
			if (test2 && test2.length) {
				stackframes.push(new Frame({ path: test2[2], async: false, scope: test2[1], line: 0, column: 0, anonymous: true }));
				continue;
			}

			const test3 = pallreg.exec(frame);
			if (test3 && test3.length) {
				stackframes.push(new Frame({ path: "node:v8/promise-all", async: true, scope: `Promise.all index ${test3[1] || 0}`, line: 0, column: 0, anonymous: false }));
				continue;
			}

			const test4 = scopereg.exec(frame);
			if (test4 && test4.length) {
				stackframes.push(new Frame({ path: test4[4], async: !!test4[1], scope: test4[2] ? `${test4[2].trim()}${test4[3] ? `as ${test4[3]}` : ""}` : "unknown", line: Number(test4[5]), column: Number(test4[6]), anonymous: (!!test4[2] && test4[2].includes("<anonymous>")) }));
				continue;
			}
		}

		if (withParentReferences) {
			for (const f of stackframes) {
				const index = stackframes.indexOf(f);
				f.parent = stackframes[index + 1] || null;
			}
		}
		return stackframes;
	}
}

export = {
	BackTracker,
	Frame,
	Stack
};
