class Product {
    constructor(name, price, image) {
        this.name = name;
        this.price = price;
        this.image = image;
    }
}

const inflationRate = 3.8

var products = [
    new Product("Car", 200, "./assets/img/car.jpg"),
    new Product("Aloe", 50, "./assets/img/aloe.jpg"),
    new Product("Shoe", 100, "./assets/img/shoe.jpg"),
    new Product("Sunglasses", 75, "./assets/img/lens.jpg"),
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

    let add = document.createElement('a');
    add.className = "btn btn-primary"
    add.innerText = "add";
    add.id = "add" + product.name

    cardBody.appendChild(name);
    cardBody.appendChild(price);
    cardBody.appendChild(add);
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

var dolar

const getDolar = () => {
    let value
    fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
        .then(response => response.json())
        .then((result) => {
            value = result[0].casa.venta
            value = setCharAt(value, 3, ".")
            dolar = value
        })
        .catch(error => console.log(error))
}

initListOfProducts();
getDolar();

cartPrice = document.getElementById("cartPrice")
cartPrice.innerText = 0
cartProducts = document.getElementById("cartProducts")

document.getElementById("addCar").addEventListener("click", () => {
    addCart(1)
})
document.getElementById("addAloe").addEventListener("click", () => {
    addCart(2)
})
document.getElementById("addShoe").addEventListener("click", () => {
    addCart(3)
})
document.getElementById("addSunglasses").addEventListener("click", () => {
    addCart(4)
})

const quotas = document.getElementById("quotas");
const currency = document.getElementById("currency");

quotas.onchange = () => {
    changePrice(quotas.value)
}

let pesos = true
currency.onclick = () => {
    pesos=!pesos
    changePriceDolar(dolar);
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

function changePriceDolar(dolar) {
    elements = document.getElementsByClassName("card-price")
    for (const el in elements) {
        if (pesos) {
            document.getElementById("currency").setAttribute("value","Cambiar a dolares")
            products[el].price = (parseFloat(products[el].price) / (parseFloat(dolar)))
            elements[el].innerText = products[el].price + " $"
        }
        else {
            document.getElementById("currency").setAttribute("value","Cambiar a pesos")
            products[el].price = (parseFloat(products[el].price) * (parseFloat(dolar)))
            elements[el].innerText = products[el].price + " $"
        }
    }
}

function addCart(productNumber) {
    let product = products[productNumber - 1]
    cartPrice.innerText = parseFloat(cartPrice.innerText) + product.price + "$"
    localStorage.setItem("cartPrice", cartPrice.innerText);

    let nodo = document.createElement("div");
    nodo.innerHTML = `
        <h3>${product.name}</h3>
        <p>Price $${product.price}</p>`
    document.getElementById("cartProducts").appendChild(nodo);

    let newList = [];
    if (localStorage.getItem("CartProducts") != null) {
        newList = JSON.parse(localStorage.getItem("CartProducts"));
        newList.push(product);
        localStorage.setItem("CartProducts", JSON.stringify(newList));
    } else {
        newList.push(product);
        localStorage.setItem("CartProducts", JSON.stringify(newList));
    }
    newList.push(product);

    Toastify({
        text: `Se añadió al carrito el producto ${product.name}`,
        duration: 3000
    }).showToast();


}

function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}