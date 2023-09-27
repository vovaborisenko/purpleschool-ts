type PossibleKeyType = string | number | symbol;
type swappableObjType = Record<PossibleKeyType, PossibleKeyType>;

function swapKeysAndValues<T extends swappableObjType>(obj: T): Record<T[keyof T], keyof T> {
    return Object.entries(obj)
        .reduce((result, [key, value]) => ({
            ...result,
            [value]: key
        }), {} as Record<T[keyof T], keyof T>);
}

const obj: { [key in string]: number } = {
    a: 1,
    b: 2
};

console.log(swapKeysAndValues(obj));
