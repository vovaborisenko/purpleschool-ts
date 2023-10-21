interface IIterator<T> {
    current(): T | undefined;
    next(): T | undefined;
    prev(): T | undefined;
    valid(): boolean;
    index(): number;
}

interface IIterableCollection<T> {
    getIteratorById(): IIterator<T>;
    getReverseIteratorById(): IIterator<T>;
    getIteratorByDate(): IIterator<T>;
    getReverseIteratorByDate(): IIterator<T>;
}

class Post {
    constructor(public id: number, public date: string, public title: string) { }
}

class PostList implements IIterableCollection<Post> {
    private list: Post[] = [];

    public sortById() {
        this.list.sort((a, b) => a.id - b.id);
    }

    public sortByDate() {
        this.list.sort((a, b) => {
            const aDateValue = new Date(a.date).valueOf();
            const bDateValue = new Date(b.date).valueOf();

            return aDateValue - bDateValue;
        });
    }

    public addItem(item: Post) {
        this.list.push(item);
    }

    public getItems(): Post[] {
        return this.list;
    };

    public getCount(): number {
        return this.list.length;
    }


    public getIteratorById(): IIterator<Post> {
        return new PostIterator(this, 'id');
    }

    public getReverseIteratorById(): IIterator<Post> {
        return new PostIterator(this, 'id', true);
    }

    public getIteratorByDate(): IIterator<Post> {
        return new PostIterator(this, 'date');
    }

    public getReverseIteratorByDate(): IIterator<Post> {
        return new PostIterator(this, 'date', true);
    }
}

class PostIterator implements IIterator<Post> {
    private position: number = 0;
    private collection: PostList;
    private reverse: boolean = false;

    constructor(collection: PostList, type = 'id', reverse: boolean = false) {
        if (type === 'id') {
            collection.sortById();
        }

        if (type === 'date') {
            collection.sortByDate();
        }

        this.collection = collection;
        this.reverse = reverse;
        this.position = reverse ? collection.getCount() - 1 : 0;
    }

    public current(): Post | undefined {
        return this.collection.getItems()[this.position];
    }

    public next(): Post | undefined {
        const item = this.collection.getItems()[this.position];
        this.position += this.reverse ? -1 : 1;

        return item;
    }

    public prev(): Post | undefined {
        const item = this.collection.getItems()[this.position];
        this.position -= this.reverse ? -1 : 1;

        return item;
    }

    public valid(): boolean {
        if (this.reverse) {
            return this.position >= 0;
        }

        return this.position < this.collection.getCount();
    }

    public index(): number {
        return this.position;
    }
}

const posts = new PostList();

posts.addItem({ id: 4, date: '12-02-2023', title: '4rd by date' });
posts.addItem({ id: 45, date: '11-03-2023', title: '2nd by date' });
posts.addItem({ id: 5, date: '11-09-2022', title: '1st by date' });
posts.addItem({ id: 15, date: '12-01-2023', title: '3th by date' });

console.log('getIteratorById');
const iteratorById = posts.getIteratorById();
print(iteratorById);

console.log('getReverseIteratorById');
const iteratorReverseById = posts.getReverseIteratorById();
print(iteratorReverseById);

console.log('getIteratorByDate');
const iteratorByDate = posts.getIteratorByDate();
print(iteratorByDate);

console.log('getReverseIteratorByDate');
const iteratorReverseByDate = posts.getReverseIteratorByDate();
print(iteratorReverseByDate);


// TODO: как сделать чтобы создание нового итератора не меняло порядок item'ов ? 
// const iteratorById = posts.getIteratorById();
// const iteratorReverseById = posts.getReverseIteratorById();
// const iteratorByDate = posts.getIteratorByDate();
// const iteratorReverseByDate = posts.getReverseIteratorByDate();

// print(iteratorById);
// print(iteratorReverseById);
// print(iteratorByDate);
// print(iteratorReverseByDate);

function print(iterator: IIterator<Post>) {
    while (iterator.valid()) {
        console.log(iterator.next());
    };
}

