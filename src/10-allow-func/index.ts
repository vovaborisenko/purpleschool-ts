class User {
    @allowFunc((a: number) => a > 0)
    age: number = 30;
}

function allowFunc(func: (...args: any[]) => any) {
    return (target: Object, propertyKey: string | symbol) => {
        let value: any;
        const setter = function (newValue: any) {
            if (!func(newValue)) {
                console.warn(`Новое значение для ${String(propertyKey)} не удовлетворяет условию декоратора allowFunc`);

                return;
            }

            value = newValue;
        };
        const getter = function () {
            return value;
        };

        Object.defineProperty(target, propertyKey, {
            set: setter,
            get: getter
        });
    };
};

const user = new User();
console.log(user.age);
user.age = 0;
console.log(user.age);
user.age = 2;
console.log(user.age);
user.age = -66;
console.log(user.age);
user.age = 6;
console.log(user.age);
