export declare class Caller {
    path: string;
    dir: string;
    filename: string;
    async: boolean;
    scope: string;
    line: number;
    column: number;
    anonymous: boolean;
    parent: Caller | null;
    constructor(details: {
        path: string;
        async: boolean;
        scope: string;
        line: number;
        column: number;
        anonymous: boolean;
    });
    toString(): string;
}
