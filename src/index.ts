const filenameRegex = /(?:(?:@)|(?:file:\/\/\/))?([^*"()]+):(\d+):(\d+)/;

const isNode = typeof process === "object";
let path: typeof import("path") | undefined = isNode ? module.require("path") : undefined;

export interface Frame {
	absolute: string;
	dir: string;
	basename: string;
	async: boolean;
	scope: string;
	line: number;
	column: number;
	anonymous: boolean;

	srcAbsolute: string;
	srcDir: string;
	srcBasename: string;
	srcLine: number;
	srcColumn: number;

	parent: Frame | null;
}

export class Stack extends Array<Frame> {
	public constructor(stackLength?: number | undefined);
	public constructor(...items: Array<Frame>);
	public constructor(...params: Array<any>) {
		super(...params);
	}

	public first(): Frame | null;
	public first(amount: number): Array<Frame>;
	public first(amount?: number): Frame | null | Array<Frame> {
		if (!amount) return this[0] ?? null;
		if (amount < 0) return this.last(amount * -1);
		return this.slice(0, amount);
	}

	public last(): Frame | null;
	public last(amount: number): Array<Frame>;
	public last(amount?: number): Frame | null | Array<Frame> {
		if (!amount) return this[this.length - 1] ?? null;
		if (amount < 0) return this.first(amount * -1);

		return this.slice(-amount);
	}
}

export function getStack(): Stack {
	// Get a formatted error stack as an Array of CallSites
	const previousPrepareStackTrace = Error.prepareStackTrace;
	const captureFN = (_: Error, stack: Array<NodeJS.CallSite>) => stack;
	Error.prepareStackTrace = captureFN;
	let { stack } = new Error();
	Error.prepareStackTrace = previousPrepareStackTrace;

	const s = new Stack();

	// for src maps if available
	const runtimeFormatted = new Error().stack ?? "";
	const split = runtimeFormatted.split("\n");
	const firstIndex = split.findIndex(f => f === "Error");
	const stringFrames = split.slice(firstIndex + 1 || 1).map(item => item.trim());

	const callSites: Array<NodeJS.CallSite> | string = stack ?? [];

	// Some engines don't support Error.prepareStackTrace like FireFox
	const root = typeof callSites === "string" ? stringFrames : callSites;
	for (let index = 0; index < root.length; index++) {
		if (index < 2) continue; // Ignore BackTracker's stack frame and the "current frame" aka where BackTracker.stack was called

		const match = filenameRegex.exec(stringFrames[index] ?? "");

		const anonymousString = "<anonymous>";

		let dir: string;
		let basename: string;
		let absolute = anonymousString;
		let async = false;
		let scope = anonymousString;
		let anonymous = true;
		let line = 0;
		let column = 0;

		const srcLine = Number(match?.[2] ?? line);
		const srcColumn = Number(match?.[3] ?? column);

		if (typeof callSites !== "string") {
			const c = callSites[index];

			scope = ((c as unknown as { isPromiseAll(): boolean }).isPromiseAll?.() ?? false)
				? "Promise.all"
				: c.getFunctionName() ?? scope;

			const filename = c.getFileName();

			absolute = c.getEvalOrigin() ?? filename ?? absolute;
			line = c.getLineNumber() ?? line;
			column = c.getColumnNumber() ?? column;
			async = (c as unknown as { isAsync(): boolean; }).isAsync?.() ?? async;
			anonymous = !filename || scope === anonymousString;
		} else {
			absolute = match?.[1] ?? absolute;
			line = srcLine;
			column = srcColumn;
		}

		dir = isNode ? path!.dirname(absolute) : absolute;
		basename = isNode ? path!.basename(absolute) : absolute;

		const srcAbsolute = match?.[1] ?? absolute;

		const frame: Frame = {
			absolute,
			dir,
			basename,
			async,
			scope,
			line,
			column,
			anonymous,

			srcAbsolute,
			srcDir: isNode ? path!.dirname(srcAbsolute) : srcAbsolute,
			srcBasename: isNode ? path!.basename(srcAbsolute) : srcAbsolute,
			srcLine,
			srcColumn,
			parent: s.last()
		}

		s.push(frame);
	}

	return s;
}
