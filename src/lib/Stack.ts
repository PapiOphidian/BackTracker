export class Stack extends Array<import("./Caller").Caller> {
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
