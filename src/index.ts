import Frame from "./Frame";
import Stack from "./Stack";

class BackTracker {
	public parent: Frame;

	public constructor() {
		this.parent = BackTracker.stack.first();
	}

	public static get stack() {
		const _ = Error.prepareStackTrace;
		Error.prepareStackTrace = (_, stack) => stack;
		const { stack } = new Error();
		Error.prepareStackTrace = _;
		const es: Array<NodeJS.CallSite> = stack as unknown as Array<NodeJS.CallSite> || [];

		const s = new Stack()

		let isFirst = true;
		for (const c of es) {
			if (isFirst) { // Ignore BackTracker's stack frame
				isFirst = false;
				continue;
			}
			const scope = (c as unknown as { isPromiseAll(): boolean }).isPromiseAll()
			? "Promise.all"
			: c.getFunctionName() || null

			const filename = c.getFileName();

			const frame = new Frame({
				path: c.getEvalOrigin() || filename || "<anonymous>",
				async: (c as unknown as { isAsync(): boolean }).isAsync(),
				scope: scope || "<anonymous>",
				line: c.getLineNumber() || 0,
				column: c.getColumnNumber() || 0,
				anonymous: !filename || !scope
			});

			s.push(frame);
		}

		for (const f of s) {
			const index = s.indexOf(f);
			f.parent = s[index + 1] || null;
		}

		return s;
	}
}

export = {
	BackTracker,
	Frame,
	Stack
};
