"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
class Stack extends Array {
    constructor() {
        super();
    }
    get first() {
        return this[0];
    }
    get last() {
        return this[this.length - 1] || null;
    }
}
exports.Stack = Stack;
//# sourceMappingURL=Stack.js.map