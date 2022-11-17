import path from "path";

class Frame {
	public path: string;
	public dir: string;
	public filename: string;
	public srcPath: string;
	public srcDir: string;
	public srcFilename: string;
	public srcLine: number;
	public srcColumn: number;
	public async: boolean;
	public scope: string;
	public line: number;
	public column: number;
	public anonymous: boolean;
	public parent: Frame | null;

	public constructor(details: { path: string; async: boolean; scope: string; line: number; column: number; anonymous: boolean; srcPath: string; srcLine: number; srcColumn: number; }) {
		this.path = details.path;
		this.dir = path.dirname(details.path);
		this.filename = path.basename(details.path);
		this.srcPath = details.srcPath
		this.srcDir = path.dirname(details.srcPath);
		this.srcFilename = path.basename(details.srcPath);
		this.srcLine = details.srcLine;
		this.srcColumn = details.srcColumn;
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

export = Frame;
