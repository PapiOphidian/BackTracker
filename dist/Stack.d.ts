declare class Stack extends Array<import("./Caller")> {
    constructor();
    get first(): import("./Caller");
    get last(): import("./Caller");
}
export = Stack;
