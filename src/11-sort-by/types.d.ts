type mapFunction = (key: string, value: any) => any;

declare module 'sort-by' {
    function sortBy<T>(...args: Array<string | mapFunction>): (obj1: T, obj2: T) => number;

    export = sortBy;
}
