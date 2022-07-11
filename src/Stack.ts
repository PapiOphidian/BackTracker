class Stack extends Array<import("./Frame")> {
	public constructor() {
		super(...arguments);
	}

	public first(): import("./Frame");
	public first(amount: number): Array<import("./Frame")>;
	public first(amount?: number): import("./Frame") | Array<import("./Frame")> {
		if (!amount) return this[0];
		if (amount < 0) return this.last(amount * -1);
		return this.slice(0, amount);
	}

	public last(): import("./Frame");
	public last(amount: number): Array<import("./Frame")>;
	public last(amount?: number): import("./Frame") | Array<import("./Frame")> {
		if (!amount) return this[this.length - 1];
		if (amount < 0) return this.first(amount * -1);

		return this.slice(-amount);
	}
}

export = Stack;
