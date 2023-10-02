type Diff<T extends Record<string, any>, V extends Record<string, any>> = {
    [P in Exclude<keyof T, keyof V>]: T[P]
};

export function diff<T extends Record<string, any>, V extends Record<string, any>>(a: T, b: V): Diff<T, V> {
    return Object.entries(a).reduce((result, [key, value]) => {
        if (!b[key]) {
            result[key] = value;
        }

        return result;
    }, {} as any);
};

const a = { a: 5, b: 'value b' };
const b = { a: 15, c: true };
const res = diff(a, b);

console.log(res);
