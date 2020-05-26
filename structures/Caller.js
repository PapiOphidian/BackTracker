const path = require("path");

class Caller {
	/**
	 * @param {{ path: string, async: boolean, scope: string, line: number, column: number, anonymous: boolean }} details
	 */
	constructor(details) {
		this.path = details.path;
		this.dir = path.dirname(details.path);
		this.filename = path.basename(details.path);
		this.async = details.async;
		this.scope = details.scope;
		this.line = details.line;
		this.column = details.column;
		this.anonymous = details.anonymous;
		/** @type {?Caller} */
		this.caller = null;
	}
	toString() {
		return this.filename;
	}
}

module.exports = Caller;
