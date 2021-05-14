"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const path_1 = __importDefault(require("path"));
class Caller {
    constructor(details) {
        this.path = details.path;
        this.dir = path_1.default.dirname(details.path);
        this.filename = path_1.default.basename(details.path);
        this.async = details.async;
        this.scope = details.scope;
        this.line = details.line;
        this.column = details.column;
        this.anonymous = details.anonymous;
        this.parent = null;
    }
    toString() {
        return this.filename;
    }
}
module.exports = Caller;
