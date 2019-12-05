const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];

const renderGoodsItem = (title = "Some Stuff", price = 0) => {
    return `<div class="goods__item"><h3 class="goods__title">${title}</h3><p class="goods__price">${price}$</p></div>`;
};

const renderGoodsList = (list) => {
    // Так как innerHTML вставляет массив, а в массиве данные разделены запятой
    // Поэтому можно добавлять значения в строку и потом уже её вставлять
    let $values = '';
    const goodsList = list.map(item => $values += renderGoodsItem(item.title, item.price));
    return $values;
}

document.querySelector('.goods__list').innerHTML = renderGoodsList(goods);