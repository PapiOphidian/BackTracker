import Frame from "./Frame";
import Stack from "./Stack";

const filenameRegex = /(?:[^( ]+)? ?\(?(?:file\:\/\/\/)?([^*"\(\)]+):(\d+):(\d+)\)?/;

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

		const s = new Stack();
		const runtimeFormatted = new Error().stack || "";
		const split = runtimeFormatted.split("\n");
		const firstIndex = split.findIndex(f => f === "Error");
		const stringFrames = split.slice(firstIndex + 1 || 1).map(item => item.trim());

		let index = 0;
		for (const c of es) {
			if (index < 2) { // Ignore BackTracker's stack frame and the "current frame" aka where BackTracker.stack was called
				index++
				continue;
			}
			const scope = (c as unknown as { isPromiseAll(): boolean }).isPromiseAll()
			? "Promise.all"
			: c.getFunctionName() || null;

			const filename = c.getFileName();

			const match = stringFrames[index]?.match(filenameRegex);

			const pathToUse = c.getEvalOrigin() || filename || "<anonymous>";
			const lineToUse = c.getLineNumber() || 0;
			const columnToUse = c.getColumnNumber() || 0;

			const frame = new Frame({
				path: pathToUse,
				async: (c as unknown as { isAsync(): boolean }).isAsync(),
				scope: scope || "<anonymous>",
				line: lineToUse,
				column: columnToUse,
				anonymous: !filename || !scope,

				srcPath: match?.[1] || pathToUse,
				srcLine: Number(match?.[2] || lineToUse),
				srcColumn: Number(match?.[3] || columnToUse)
			});

			s.push(frame);
			index++;
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
