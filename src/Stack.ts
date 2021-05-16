class Stack extends Array<import("./Caller")> {
	public constructor() {
		super(...arguments);
	}

	public first(amount?: number) {
                if (!amount) return this[0];
                if (amount < 0) return this.last(amount * -1);
                
                return this.slice(0, amount);
	}

	public last(amount?: number) {
		if (!amount) return this[this.length - 1];
                if (amount < 0) return this.first(amount * -1);
                
                return this.slice(-amount);
	}
}

export = Stack;
