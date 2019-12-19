class GoodsItem {
    constructor(title = "Some Stuff", price = 0) {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="goods__item">
                    <h3 class="goods__title">${this.title}</h3>
                    <p class="goods__price">${this.price}$</p>
                </div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
        ]
    }
    // Подсчёт суммы всех товаров
    totalPrice() {
        let sum = 0,
            totalSum = document.createElement("div");
        const container = document.querySelector(".goods__list");

        totalSum.className = "goods__total";

        this.goods.map(good => {
            sum += good.price;
        });

        totalSum.innerHTML = `Total: <span class="goods__total_bold">${sum}$</span>`;
        container.after(totalSum);
    }
    render() {
        let listHtml = '';

        this.goods.map(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector(".goods__list").innerHTML = listHtml;
        this.totalPrice();
    }
}

const list = new GoodsList();
list.fetchGoods();

document.addEventListener("DOMContentLoaded", () => {
    list.render();
})
// Класс для корзины
class Cart {
    constructor() {
        this.cartItems = [];
    }
    addItem() {
        // Добавление товара
    }
    removeItem() {
        // Удаление товара
    }
    render() {
        // Отрисовка корзины
    }
}

class CartItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="cart__item">
                    <span class="cart__title">${this.title}</span>
                    <span class="cart__price">${this.price}</span>
                    <button class="cart__btn">Удалить</button>
                </div>`;
    }
}