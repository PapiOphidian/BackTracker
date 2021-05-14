class Stack extends Array<import("./Caller")> {
	public constructor() {
		super();
	}

	public get first() {
		return this[0];
	}

	public get last() {
		return this[this.length - 1] || null;
	}
}

export = Stack;
