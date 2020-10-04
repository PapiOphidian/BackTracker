import { Caller } from "./Caller";
import { Stack } from "./Stack";
export declare class BackTracker {
    parent: Caller;
    constructor();
    static get stack(): Stack;
}
