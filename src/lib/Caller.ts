import path from "path";

export class Caller {
	public path: string;
	public dir: string;
	public filename: string;
	public async: boolean;
	public scope: string;
	public line: number;
	public column: number;
	public anonymous: boolean;
	public parent: Caller | null;

	public constructor(details: { path: string; async: boolean; scope: string; line: number; column: number; anonymous: boolean; }) {
		this.path = details.path;
		this.dir = path.dirname(details.path);
		this.filename = path.basename(details.path);
		this.async = details.async;
		this.scope = details.scope;
		this.line = details.line;
		this.column = details.column;
		this.anonymous = details.anonymous;
		this.parent = null;
	}
	public toString() {
		return this.filename;
	}
}
