const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const makeGETRequest = (url) => {
    return new Promise((resolve, reject) => {
        let xhr;

        if(window.XMLHttpRequest) {
            xhr = new window.XMLHttpRequest();
        } else {
            xhr = new window.ActiveXObject('Microsoft.XMLHTTP');
        }
        setTimeout(() => {
            if(xhr.readyState === 4 && xhr.status === 200) {
                const body = JSON.parse(xhr.responseText)
                resolve(body);
            } else {
                reject(new Error("Network Error"));
            }
        }, 100)
        xhr.open('GET', url);
        xhr.send();
    })


}

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
        makeGETRequest(`${API_URL}/catalogData.json`)
            .then((goods) => {
                this.goods = goods;
                list.render();
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
            const goodItem = new GoodsItem(good.product_name, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector(".goods__list").innerHTML = listHtml;
        this.totalPrice();
    }
}

// Класс для корзины
class Cart extends GoodsList {
    constructor() {
        super(props);
    }
    clean() {}
    incGood() {}
    decGood() {}
}

class CartItem extends GoodsItem {
    constructor(props) {
        super(props);
    }
    delete() {}
}

const list = new GoodsList();
list.fetchGoods();