class Caller {
	/**
	 * @param {{ filename: string, async: boolean, scope: string, line: number, column: number }} details
	 */
	constructor(details) {
		this.filename = details.filename;
		this.scope = details.scope;
		this.line = details.line;
		this.column = details.column;
	}
	toString() {
		return this.filename;
	}
}

module.exports = Caller;
