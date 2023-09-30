/*
    Необходимо сделать корзину (Cart) на сайте,
    которая имееет список продуктов (Product), добавленных в корзину
    и переметры доставки (Delivery). Для Cart реализовать методы:
    - Добавить продукт в корзину
    - Удалить продукт из корзины по ID
    - Посчитать стоимость товаров в корзине
    - Задать доставку
    - Checkout - вернуть что всё ок, если есть продукты и параметры доставки
    Product: id, название и цена
    Delivery: может быть как до дома (дата и адрес) или до пункта выдачи (дата = Сегодня и Id магазина)
*/

class Product {
    constructor(
        public id: number,
        public title: string,
        public price: number
    ) { }
}

class Delivery {
    constructor(public date: Date) { }
}

class DeliveryHome extends Delivery {
    constructor(
        public date: Date,
        public address: string
    ) {
        super(date);
    }
}

class DeliveryShop extends Delivery {
    constructor(
        public date: Date = new Date(),
        public shopId: number
    ) {
        super(date);
    }
}

type DeliveryType = DeliveryHome | DeliveryShop;

interface ICart {
    addProduct(product: Product): void;
    removeProduct(productId: number): void;
    totalPrice(): number;
    setDelivery(delivery: DeliveryType): void;
    checkout(): boolean;
}

class Cart implements ICart {
    public products: Product[] = [];
    public delivery?: DeliveryType;

    addProduct(product: Product): void {
        this.products.push(product);
    }
    removeProduct(productId: number): void {
        this.products = this.products.filter(({ id }) => id !== productId);
    }
    totalPrice(): number {
        return this.products.reduce((acc, { price }) => acc + price, 0);
    }
    setDelivery(delivery: DeliveryType): void {
        this.delivery = delivery;
    }
    checkout(): boolean {
        return !!this.delivery && this.products.length > 0;
    }
}

const product1 = { id: 3, title: 'Prod3', price: 100 };
const product2 = { id: 6, title: 'Prod6', price: 10 };
const product3 = { id: 9, title: 'Prod9', price: 1 };

const delivery1 = { date: new Date(), address: 'Restarnt str.' };

const cart = new Cart();

cart.addProduct(product1);
cart.addProduct(product3);
cart.addProduct(product2);
console.log('checkout', cart.checkout());
console.log('totalPrice', cart.totalPrice());
cart.setDelivery(delivery1);
cart.removeProduct(3);
console.log('checkout', cart.checkout());
console.log('totalPrice', cart.totalPrice());
