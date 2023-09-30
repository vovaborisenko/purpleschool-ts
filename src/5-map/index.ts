export class MineMap {
    private hashTable: Record<number, [any, any][]> = {};

    constructor(entries?: [any, any][]) {
        entries?.forEach(([key, value]) => this.set(key, value));
    }

    public set(key: any, value: any): this {
        const hash = getHash(key);

        if (!this.hashTable[hash]) {
            this.hashTable[hash] = [[key, value]];

            return this;
        }

        const savedData = this.hashTable[hash].find(([savedKey]) => key === savedKey);

        if (savedData) {
            savedData[1] = value;
        } else {
            this.hashTable[hash].push([key, value]);
        }

        return this;
    }

    public get(key: any): any {
        const hash = getHash(key);
        const [, value] = this.hashTable[hash]?.find(([savedKey]) => key === savedKey) || [];

        return value;
    }

    public delete(key: any): boolean {
        const hash = getHash(key);

        if (!this.hashTable[hash]) {
            return false;
        }

        const foundIndex = this.hashTable[hash].findIndex(([savedKey]) => key === savedKey);

        if (foundIndex === -1) {
            return false;
        }

        this.hashTable[hash].splice(foundIndex, 1);

        if (this.hashTable[hash].length === 0) {
            delete this.hashTable[hash];
        }

        return true;
    }

    public clear(): void {
        this.hashTable = {};
    }
}

function getHash(value: any): number {
    let hash = 0;
    let string = '';

    try {
        string = typeof value === 'function'
            ? value.toString()
            : JSON.stringify(value);
    } catch {
        return hash;
    }

    if (string.length == 0) {
        return hash;
    }

    for (let i = 0; i < string.length; i++) {
        const char = string.charCodeAt(i);

        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }

    return hash;
}
