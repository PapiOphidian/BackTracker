"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Caller = void 0;
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
exports.Caller = Caller;
//# sourceMappingURL=Caller.js.map