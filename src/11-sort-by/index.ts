import sortBy from "sort-by";

console.log([{ field: 3 }].sort(sortBy('field', (s, r) => r[s])));
