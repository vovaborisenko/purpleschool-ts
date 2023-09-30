const data = [
    { id: 2, name: 'Петя' },
    { id: 1, name: 'Вася' },
    { id: 3, name: 'Надя' },
];

function sortGeneric<T extends { id: number; }>(arr: T[], order: 'asc' | 'desc' = 'asc'): T[] {
    const modifier = order === 'asc' ? 1 : -1;

    return arr.sort((a, b) => (a.id - b.id) * modifier);
}

console.log(sortGeneric(data));
console.log(sortGeneric(data, 'desc'));
