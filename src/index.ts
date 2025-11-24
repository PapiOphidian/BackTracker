const filenameRegex = /(?:(?:@)|(?:file:\/\/\/))?([^*"()]+):(\d+):(\d+)/;

const isNode = typeof process === "object";
let path: typeof import("path") | undefined = isNode ? module.require("path") : undefined;
const anonymousString = "<anonymous>";

export class Frame {
	public absolute: string = anonymousString;
	public dir: string = anonymousString;
	public basename: string = anonymousString;
	public async: boolean = false;
	public scope: string = anonymousString;
	public line: number = 0;
	public column: number = 0;
	public anonymous: boolean = true;

	public srcAbsolute: string = anonymousString;
	public srcDir: string = anonymousString;
	public srcBasename: string = anonymousString;
	public srcLine: number = 0;
	public srcColumn: number = 0;

	public parent: Frame | null = null;
	public appended: string | null = null;

	public constructor(public unparsed: string, public stack: Stack) {}

	/**
	 * Appends text after the error stack frame, also modifying the original error's stack text if possible
	 * @param text What to append directly after the unparsed frame. Doesn't add a space. You'll need to add one yourself if you desire that.
	 */
	public appendText(text: string | null): void {
		const ind = this.stack.indexOf(this);
		if (ind === -1) return;
		const stk = this.stack.error.stack;
		if (!stk || typeof stk !== "string") return;
		const split = stk.split("\n") ?? [];
		if (!split.length) return;
		const inSplit = ind + this.stack.framesStartInErrorFromSplitIndex;
		if (inSplit < 0 || inSplit >= split.length) return;
		this.appended = text;
		if (text) split[inSplit] = `${this.unparsed}${this.appended}`;
		else split[inSplit] = this.unparsed;
		this.stack.error.stack = split.join("\n");
	}
}

export class Stack extends Array<Frame> {
	public constructor(error: Error, framesStartInErrorFromSplitIndex: number, stackLength?: number | undefined);
	public constructor(error: Error, framesStartInErrorFromSplitIndex: number, ...items: Array<Frame>);
	public constructor(public error: Error, public framesStartInErrorFromSplitIndex: number, ...params: Array<any>) {
		super(...params.slice(2));
	}

	public static fromError(error: Error): Stack {
		return getStack(error);
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
		if (!amount) return this.at(-1) ?? null;
		if (amount < 0) return this.first(amount * -1);

		return this.slice(-amount);
	}
}

/**
 * Generates a more easily traversable Stack for either a supplied error or a new one to allow peeking back in code execution
 * @param error If you supply your own Error, you must ensure that the stack hasn't been baked, meaning accessing the stack property anywhere. After BackTracker generates the Stack, you can access the string representation with no consequence afterwards.
 * @see https://v8.dev/docs/stack-trace-api#customizing-stack-traces
 */
export function getStack(error?: Error): Stack {
	const previousPrepareStackTrace = Error.prepareStackTrace;

	let callSites = undefined as Array<NodeJS.CallSite> | undefined;
	let called = false;

	Error.prepareStackTrace = function(err: Error, stack: Array<NodeJS.CallSite>) {
		if (called) return Error.prepareStackTrace.call(this, err, stack);
		callSites = stack;
		called = true;
		return previousPrepareStackTrace.call(this, err, stack);
	};

	const e = error ?? new Error("BackTracker Dummy Error");
	void e.stack;

	Error.prepareStackTrace = previousPrepareStackTrace;

	// for src maps if available
	const defaultFormatting = e.stack ?? "";
	const split = defaultFormatting.split("\n");
	const firstIndex = split.findIndex(t => t.startsWith(e.name)) + 1 || 1;
	const stringFrames = split.slice(firstIndex).map(item => item.trim());

	const s = new Stack(e, firstIndex);

	// Some engines don't support Error.prepareStackTrace like FireFox
	const root = callSites ?? stringFrames;

	let lastFrame: Frame | null = null;

	for (let index = 0; index < root.length; index++) {
		if (index < (error ? 1 : 2)) continue; // Ignore BackTracker's stack frame and the "current frame" aka where getStack was called

		const match = filenameRegex.exec(stringFrames[index] ?? "");

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

		if (callSites) {
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

		const frame = new Frame(stringFrames[index], s);
		frame.absolute = absolute;
		frame.dir = dir;
		frame.basename = basename;
		frame.async = async;
		frame.scope = scope;
		frame.line = line;
		frame.column = column;
		frame.anonymous = anonymous;

		frame.srcAbsolute = srcAbsolute;
		frame.srcDir = isNode ? path!.dirname(srcAbsolute) : srcAbsolute;
		frame.srcBasename = isNode ? path!.basename(srcAbsolute) : srcAbsolute;
		frame. srcLine = srcLine;
		frame.srcColumn = srcColumn;
		frame.parent = null;

		if (lastFrame) lastFrame.parent = frame;
		lastFrame = frame;

		s.push(frame);
	}

	return s;
}
