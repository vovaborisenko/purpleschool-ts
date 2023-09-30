// Необходимо написать функцию группировки, которая принимает массив объектов
// и его ключ, производит группировку по указанному ключу и возращает
// сгруппированный объект.
// Пример:
// [
// 	{ group: 1, name: 'a' },
// 	{ group: 1, name: 'b' },
// 	{ group: 2, name: 'c' },
// ];

// При группироке по 'group' ---->

// {
// 	'1': [ { group: 1, name: 'a' }, { group: 1, name: 'b' } ],
// 	'2': [ { group: 2, name: 'c' } ]
// }

type PossibleKeyType = string | number | symbol;

function groupByKey<T extends Record<PossibleKeyType, PossibleKeyType>>(list: T[], key: keyof T): Record<T[keyof T], T[]> {
    return list.reduce<Record<T[keyof T], T[]>>((result, item) => {
        const group = item[key];

        if (result[group]) {
            result[group].push(item);
        } else {
            result[group] = [item];
        }

        return result;
    }, {} as Record<T[keyof T], T[]>);
}

export default {};

const data = [
    { group: 1, name: 'a' },
    { group: 1, name: 'b' },
    { group: 2, name: 'c' },
];

console.log(groupByKey(data, 'group'));

