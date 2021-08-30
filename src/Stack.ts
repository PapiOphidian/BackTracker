class Stack extends Array<import("./Caller")> {
	public constructor() {
		super(...arguments);
	}

	public first(): import("./Caller");
	public first(amount: number): Array<import("./Caller")>;
	public first(amount?: number): import("./Caller") | Array<import("./Caller")> {
		if (!amount) return this[0];
		if (amount < 0) return this.last(amount * -1);
		return this.slice(0, amount);
	}

	public last(): import("./Caller");
	public last(amount: number): Array<import("./Caller")>;
	public last(amount?: number): import("./Caller") | Array<import("./Caller")> {
		if (!amount) return this[this.length - 1];
		if (amount < 0) return this.first(amount * -1);

		return this.slice(-amount);
	}
}

export = Stack;
