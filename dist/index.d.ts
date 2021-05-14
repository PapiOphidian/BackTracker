import Caller from "./Caller";
import Stack from "./Stack";
declare class BackTracker {
    parent: Caller;
    constructor();
    static get stack(): Stack;
}
declare const _default: {
    BackTracker: typeof BackTracker;
    Caller: typeof Caller;
    Stack: typeof Stack;
};
export = _default;
