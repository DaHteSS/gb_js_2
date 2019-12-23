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
        xhr.onerror = function(err) {
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
class Cart extends GoodsList {
    constructor(props) {
        super(props);
        this.cartItems = [];
        this.container = null;
        this.cartBtn = document.querySelector(".cart__button");
    }
    initClickEvents() {
        const closeBtn = document.querySelector(".cart__close");
        const cartCleanBtn = document.querySelector(".cart__close");
        this.container = document.querySelector(".cart__container");
        this.cartBtn.addEventListener("click", () => {
            this.showCart();
        });
        closeBtn.addEventListener("click", () => {
            this.hideCart();
        })
        cartCleanBtn.addEventListener("click", () => {
            this.clean()
        })
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
                if(this.checkCartItem(btn)) {
                    console.log(this.cartItems)
                    return;
                } else {
                    this.cartItems.push(btn.getAttribute("data-id"));
                    console.log(this.cartItems)
                }
            })
        })
    }
    checkCartItem(btn) {
        for(let i = 0; i < this.cartItems.length; i++) {
            if(this.cartItems[i] === btn.getAttribute("data-id")) {
                return true;
            }
        }
    }
    clean() {
        this.cartItems = [];
     }
    incGood() { }
    decGood() { }
}

class CartItem extends GoodsItem {
    constructor(props) {
        super(props);
    }
    delete() { }
    render() {
        return `<div class="cart__item">
                    <h3 class="cart__item-title">${this.title}</h3>
                    <p class="cart__item-price">${this.price}$</p>
                </div>`;
    }
}

const list = new GoodsList();
list.fetchGoods().then(() => {
    list.render();
    cart.addToCart();
});
const cart = new Cart();
cart.initClickEvents();