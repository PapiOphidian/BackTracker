declare class Stack extends Array<import("./Caller")> {
    constructor();
    first(amount?: number): import("./Caller") | Array<import("./Caller")>;
    last(amount?: number): import("./Caller") | Array<import("./Caller")>;
}
export = Stack;
