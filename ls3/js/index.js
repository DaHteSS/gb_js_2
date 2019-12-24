const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const makeGETRequest = (url) => {
    return new Promise((resolve, reject) => {
        let xhr;

        if (window.XMLHttpRequest) {
            xhr = new window.XMLHttpRequest();
        } else {
            xhr = new window.ActiveXObject('Microsoft.XMLHTTP');
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const body = JSON.parse(xhr.responseText)
                    resolve(body);
                } else {
                    reject(new Error("Network Error"));
                }
            }
        }
        xhr.onerror = function (err) {
            reject(err);
        }

        xhr.open('GET', url);
        xhr.send();
    })


}

class GoodsItem {
    constructor(title = "Some Stuff", price = 0, id_product = 0) {
        this.title = title;
        this.price = price;
        this.id_product = id_product;
    }
    render() {
        return `<div class="goods__item">
                    <h3 class="goods__title">${this.title}</h3>
                    <p class="goods__price">${this.price}$</p>
                    <button class="goods__btn" data-id="${this.id_product}">Добавить</button>
                </div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        return makeGETRequest(`${API_URL}/catalogData.json`)
            .then((goods) => {
                this.goods = goods;
            })
            .catch(err => console.log(err));
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
            const goodItem = new GoodsItem(good.product_name, good.price, good.id_product);
            listHtml += goodItem.render();
        });
        document.querySelector(".goods__list").innerHTML = listHtml;
        this.totalPrice();
    }
}

// Класс для корзины
class CartItem extends GoodsItem {
    constructor(...props) {
        super(...props);
    }
    render() {
        return `<div class="cart__item">
                    <h3 class="cart__item-title">${this.title}</h3>
                    <p class="cart__item-price">${this.price}$</p>
                    <div class="cart__cell">
                    <button class="cart__dec">-</button>
                    <input class="cart__input" type="text" value="1">
                    <button class="cart__inc">+</button>
                    </div>
                    <button class="cart__item-remove" data-remove="${this.id_product}">Удалить</button>
                </div>`;
    }
}

class Cart extends GoodsList {
    constructor(props) {
        super(props);
        this.cartItems = [];
        this.container = null;
        this.cartBtn = document.querySelector(".cart__button");
        this.render();
        this.cartTotal();
    }
    initClickEvents() {
        const closeBtn = document.querySelector(".cart__close");
        const cartCleanBtn = document.querySelector(".cart__clean");
        this.container = document.querySelector(".cart__container");
        this.cartBtn.addEventListener("click", () => {
            this.showCart();
        });
        closeBtn.addEventListener("click", () => {
            this.hideCart();
        });
        cartCleanBtn.addEventListener("click", () => {
            this.clean()
        });
    }
    showCart() {
        this.container.classList.remove("cart__container_hidden");
    }
    hideCart() {
        this.container.classList.add("cart__container_hidden");
    }
    addToCart() {
        let goodsBtns = document.querySelectorAll(".goods__btn");
        goodsBtns = [].slice.call(goodsBtns);
        goodsBtns.map(btn => {
            btn.addEventListener("click", () => {
                if (this.checkCartItem(btn)) {
                    return;
                } else {
                    this.cartItems.push(btn.getAttribute("data-id"));
                    // btn.classList.add("btn_unactive");
                    // btn.innerHTML = "В корзине";
                    this.render();
                    this.cartTotal();
                    this.deleteItem();
                    this.incGood();
                    this.decGood();
                }
            })
        })
    }
    checkCartItem(btn) {
        for (let i = 0; i < this.cartItems.length; i++) {
            if (this.cartItems[i] === btn.getAttribute("data-id")) {
                return true;
            }
        }
    }
    deleteItem() {
        let removeBtn = document.querySelectorAll(".cart__item-remove");
        removeBtn = [].slice.call(removeBtn);
        removeBtn.map(btn => {
            btn.addEventListener("click", () => {
                for(let i = 0; i < this.cartItems.length; i++) {
                    if(btn.getAttribute("data-remove") === this.cartItems[i]) {
                        this.cartItems.splice(this.cartItems.indexOf(this.cartItems[i]), 1);
                        this.render();
                        this.cartTotal();
                        if(this.cartItems.length !== 0) {
                            this.deleteItem();
                        }
                    }
                }
            })
        })
    }
    cartTotal(input) {
        let total = 0;
        for (let i = 0; i < this.cartItems.length; i++) {
            for (let j = 0; j < this.goods.length; j++) {
                if (parseInt(this.cartItems[i]) === this.goods[j].id_product) {
                    total += parseInt(input.value) * this.goods[j].price;
                }
            }
        }
        document.querySelector(".cart__total").innerHTML = total;
    }
    clean() {
        this.cartItems = [];
        this.render();
    }
    render() {
        let listHtml = '';
        for (let i = 0; i < this.cartItems.length; i++) {
            for (let j = 0; j < this.goods.length; j++) {
                if (parseInt(this.cartItems[i]) === this.goods[j].id_product) {
                    const cartItem = new CartItem(this.goods[j].product_name, this.goods[j].price, this.goods[j].id_product);
                    listHtml += cartItem.render();
                }
            }
        }
        if (listHtml === '') {
            listHtml = '<span class="cart__title">Не добавлено ни одного товара</span>';
        }
        document.querySelector(".cart__items").innerHTML = listHtml;
    }
    incGood() {
        let incBtns = document.querySelectorAll(".cart__inc");

        incBtns = [].slice.call(incBtns);
        incBtns.map(btn => {
            let input = btn.previousElementSibling;
            btn.addEventListener("click", () => {
                input.value = parseInt(input.value) + 1;
                this.cartTotal(input);
            })
        })
    }
    decGood() {
        let decBtns = document.querySelectorAll(".cart__dec");

        decBtns = [].slice.call(decBtns);
        decBtns.map(btn => {
            let input = btn.nextElementSibling;
            btn.addEventListener("click", () => {
                if (input.value <= 0) {
                    input.value = 0;
                    this.cartTotal(input)
                } else {
                    input.value = parseInt(input.value) - 1;
                    this.cartTotal(input)
                }
            })
        })
    }
}

const list = new GoodsList();
const cart = new Cart();
list.fetchGoods().then(() => {
    list.render();
})
cart.fetchGoods().then(() => {
    cart.addToCart();
    cart.initClickEvents();
});