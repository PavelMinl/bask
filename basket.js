"use strict"

/* отрисовка конструктора */
class products {

    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}
let productBasket = {

}
const product = [
    new products(
        0,
        "ELLERY X M'O CAPSULE1",
        123.00,
    ),
    new products(
        1,
        "ELLERY X M'O CAPSULE2",
        89.00,
    ),
    new products(
        2,
        "ELLERY X M'O CAPSULE3",
        76.00,
    ),
    new products(
        3,
        "ELLERY X M'O CAPSULE4",
        62.00,
    ),
    new products(
        4,
        "ELLERY X M'O CAPSULE5",
        12.00,
    ),
    new products(
        5,
        "ELLERY X M'O CAPSULE6",
        32.00,
    )
];

const basketOpen = document.querySelector(".cartIconWrap")
const basketPlace = document.querySelector(".basket")
const basketTest = document.querySelector('.tableEnd');
const basketSum = document.querySelector('.basketResultTotal');
/* открытие, закрытие корзины на странице */
basketOpen.addEventListener("click", function () {
    basketPlace.classList.toggle("stels");
})
/* Перебор всех кнопок по data-id */
function addProductListen() {
    const addCardProductButton = document.querySelectorAll("button[data-id]");
    addCardProductButton.forEach(function (clickbtn) {
        clickbtn.addEventListener("click", addProductEven);
    })
}
/*Функция увеличение колличества товаров шт. при добавлении */
function productMultiplicNumber(productId) {
    const productMultiColl = document.querySelector(`.addProductTotal[id="${productId}"]`);
    productMultiColl.textContent++;
}
/*Функция увеличения сумарной стоймости товара при добавление */
function productMultiplicPrice(productId) {
    const productRowTot = document.querySelector(`.addProductRaw[id="${productId}"]`);
    let priceMultipl = (productBasket[productId] * product[productId].price);
    productRowTot.textContent = priceMultipl;
}
/* Функции добавления товара через таргет по data-id на кнопке */
function addProductEven(event) {
    const productId = event.target.getAttribute("data-id")
    addProduct(productId);
}
addProductListen();

/*Функция добавление товара в корзину и активация соотвествующей функции если товар есть и если его нет */
function addProductBasket(productId) {
    let productInsert = document.querySelector(`.addProductTotal[id="${productId}"]`)
    if (productInsert) {
        addProductCount(productId);
        productMultiplicPrice(productId);
        productMultiplicNumber(productId);
    } else {
        addProductCount();
        addProductDraw(productId);
    }
}
/*Функция добавление в документ кусок таблици с данными товара, если он отсуствовал */
function addProductDraw(productId) {
    let productTable = `
    <tr class="basket${productId}">
    <td class="basketProduct">${product[productId].name}</td>
    <td class="basketProduct"><span class="addProductTotal" id="${productId}">1</span>шт.</td>
    <td class="basketProduct">$${product[productId].price}</td>
    <td class="basketProduct">$<span class="addProductRaw" id="${productId}">${product[productId].price}</span></td>
    <td class="basketProduct"><button class="productDelt" data-delid="${productId}">Удалить</button></td>
</tr>
        `;
    basketTest.insertAdjacentHTML("beforebegin", productTable);
    delProductListen()
}
/* Функция увеличения числа над корзиной */
function addProductCount() {
    const numberSpan = document.querySelector(".cartIconWrap span")
    numberSpan.textContent++;
}
/* Добавление колличества товара в обьект корзины */
function addProductId(productId) {
    if (!(productId in productBasket)) {
        productBasket[productId] = 1;
    } else {
        productBasket[productId]++;
    }
}
/* Общая сумма товаров в корзине */
function addProductCalc() {
    let productSum = 0;
    for (let productId in productBasket) {
        productSum += productBasket[productId] * product[productId].price;
    }
    basketSum.textContent = productSum;
}
/* Добавление товара */
function addProduct(productId) {
    addProductId(productId);
    addProductBasket(productId);
    addProductCalc();
}

function delProductListen() {
    const addCardProductButton = document.querySelectorAll("button[data-delid]");
    addCardProductButton.forEach(function (clickbtn) {
        clickbtn.addEventListener("click", delProductEven);
    })
}
function delProductEven(event) {
    const productDel = event.target.getAttribute("data-delid")
    delProduct(productDel);
}
function delProductId(productDel) {
    if (productBasket[productDel] > 0) {
        productBasket[productDel]--;
    }
}
function delproductMultiplicPrice(productDel) {
    const delproductRowTot = document.querySelector(`.addProductRaw[id="${productDel}"]`);
    let delpriceMultipl = (delproductRowTot.textContent - product[productDel].price);
    if (delpriceMultipl > -1) {
        delproductRowTot.textContent = delpriceMultipl;
    }
}
function delproductMultiplicNumber(productDel) {
    const delproductMultiColl = document.querySelector(`.addProductTotal[id="${productDel}"]`);
    if (delproductMultiColl.textContent > 0) {
        delproductMultiColl.textContent--;
    }
}
function delProductBasket(productDel) {
    let productInsert = document.querySelector(`.addProductTotal[id="${productDel}"]`)
    if (productInsert.textContent > 0) {
        delProductCount();
        delproductMultiplicPrice(productDel);
        delproductMultiplicNumber(productDel)
    }
}
function delProductCalc(productDel) {
    const basketSum = document.querySelector(".basketResultTotal");
    if (basketSum.textContent > 0) {
        let delpriceMultiplSum = (basketSum.textContent - product[productDel].price);
        basketSum.textContent = delpriceMultiplSum;
    }

}
function delProductCatalog(productDel) {
    const delproductMultiColl = document.querySelector(`.addProductTotal[id="${productDel}"]`);
    if (delproductMultiColl.innerHTML == 0) {
        let btn = document.querySelector(`.basket${productDel}`);
        btn.remove();
    }

}
function delProductCount() {
    const numberSpan = document.querySelector(".cartIconWrap span")
    if (numberSpan.textContent > 0) {
        numberSpan.textContent--;
    }
}
function delProduct(productDel) {
    delProductId(productDel);
    delProductBasket(productDel);
    delProductCalc(productDel);
    delProductCatalog(productDel)
}