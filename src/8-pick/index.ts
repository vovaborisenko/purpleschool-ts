type PickObject<T, V extends (keyof T)[]> = {
    [P in V[number]]: T[P]
};

export function pickObjectKeys<T, V extends (keyof T)[]>(object: T, keys: V): PickObject<T, V> {
    return keys.reduce((result, key) => {
        result[key] = object[key];

        return result;
    }, {} as PickObject<T, V>);
};

const user = {
    name: 'Name',
    age: 12,
    skills: ['js', 'ts']
};
const res = pickObjectKeys(user, ['name', 'age']);

console.log(res.age, res.name, res);
