declare class Stack extends Array<import("./Caller")> {
    constructor();
    first(): import("./Caller");
    first(amount: number): Array<import("./Caller")>;
    last(): import("./Caller");
    last(amount: number): Array<import("./Caller")>;
}
export = Stack;
