class Product {
    constructor(name, price, image) {
        this.name = name;
        this.price = price;
        this.image = image;
    }
}

const inflationRate = 3.8

var products = [
    new Product("Car", 200, "/DesafíoEntregable2/assets/car.jpg"),
    new Product("Aloe", 50, "/DesafíoEntregable2/assets/aloe.jpg"),
    new Product("Shoe", 100, "/DesafíoEntregable2/assets/shoe.jpg"),
    new Product("Sunglasses", 75, "/DesafíoEntregable2/assets/lens.jpg"),
];

let cardContainer;

let createProductCard = (product) => {

    let card = document.createElement('div');
    card.className = 'card';
    card.style = "width: 200px"

    let cardImage = document.createElement('img');
    cardImage.className = 'card-img-top';
    cardImage.setAttribute("src", product.image)

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let name = document.createElement('h5');
    name.innerText = product.name;
    name.className = 'card-name';

    let price = document.createElement('div');
    price.innerText = product.price + "$";
    price.className = 'card-price';

    cardBody.appendChild(name);
    cardBody.appendChild(price);
    card.appendChild(cardImage);
    card.appendChild(cardBody);
    cardContainer.appendChild(card);

}

let initListOfProducts = () => {
    if (cardContainer) {
        document.getElementById('card-container').replaceWith(cardContainer);
        return;
    }
    cardContainer = document.getElementById('card-container');
    products.forEach((product) => {
        createProductCard(product);
    });
};

initListOfProducts();

const quotas = document.getElementById("quotas");

quotas.onchange = () => {
    changePrice(quotas.value)
}

function addProduct() {
    var name = document.getElementById("productName")
    var price = document.getElementById("price")
    var payMethod = document.getElementById("payMethod")
    products.push(new Product(name, price, payMethod))
}

function quotasPrice(price, times) {
    if (times > 1) {
        for (let i = 0; i < times; i++) {
            price = price * (inflationRate / 100 + 1)
        }
    }
    return (price / times).toFixed(2)
}

function changePrice(times) {
    elements = document.getElementsByClassName("card-price")
    for (const el in elements) {
        elements[el].innerText = times + " cuotas de " + quotasPrice(products[el].price, times) + "$"
    }
}

