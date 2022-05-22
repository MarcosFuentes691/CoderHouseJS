const cart = document.querySelector("#cart");
const cartModalOverlay = document.querySelector(".cart-modal-overlay");
const closeBtn = document.querySelector("#close-btn");
const addToCart = document.getElementsByClassName("btn btn-primary add-to-cart"); //da un array
const productRows = document.getElementsByClassName("product-row"); // da un array
let cardContainer;
var dolar

class Product {
    constructor(name, price, image) {
        this.name = name;
        this.price = price;
        this.image = image;
    }
}

var products = [
    new Product("Car", 200, "./assets/img/car.jpg"),
    new Product("Aloe", 50, "./assets/img/aloe.jpg"),
    new Product("Shoe", 100, "./assets/img/shoe.jpg"),
    new Product("Sunglasses", 75, "./assets/img/lens.jpg"),
];


let createProductCard = (product) => {

    let card = document.createElement('div');
    card.className = 'card-product';
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
    add.className = "btn btn-primary add-to-cart"
    add.innerText = "Add";
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

cart.addEventListener("click", () => {
    cartModalOverlay.classList.add("open");
})

closeBtn.addEventListener("click", () => {
    cartModalOverlay.classList.remove("open");
})
cartModalOverlay.addEventListener("click", (e) => {
    if (e.target.classList.contains("cart-modal-overlay")) {
        cartModalOverlay.classList.remove("open");
    }
})

for (let i = 0; i < addToCart.length; i++) {
    console.log(addToCart[i])
    let boton = addToCart[i];
    boton.addEventListener("click", agregarCarrito)
}

function agregarCarrito(e) {
    console.log(e)
    let boton = e.target;
    let cartItem = boton.parentElement;
    let prodName = cartItem.querySelector(".card-name").innerText;
    let price = cartItem.querySelector(".card-price").innerText;
    let imageSrc = cartItem.parentElement.querySelector(".card-img-top").src;

    addCart(prodName, price, imageSrc);
}

const currency = document.getElementById("currency");

let pesos = true
currency.onclick = () => {
    pesos = !pesos
    updatePriceDolar(pesos);
}



function addCart(prodName, price, imageSrc) {

    let productRow = document.createElement("div");
    let productRows = document.querySelector(".product-rows");
    let prodArray = document.getElementsByClassName("product-row");

    for (let i = 0; i < prodArray.length; i++) {
        if (prodArray[i].getAttribute("id") == prodName) {
            alert("Este producto ya existe en el carrito");
            return;
        }
    }
    let cartRowItem = `
        <div class="product-row" id="${prodName}">
            <img class="cart-image" src="${imageSrc}">
            <span>${prodName}</span>
            <span class="cart-price">${price}</span>
            <input class="product-quantity" type="number" value="1">
            <button class="remove-btn">Borrar</button>
        </div>
    `
    productRow.innerHTML = cartRowItem;
    productRows.append(productRow);
    productRow.querySelector(".remove-btn").addEventListener("click", removeItem);
    productRow.querySelector(".product-quantity").addEventListener("change", cambiarCantidad)
    updatePrice();

    Toastify({
        text: `Se añadió al carrito el producto ${prodName}`,
        duration: 3000
    }).showToast();


}

function removeItem(e) {
    let btnCliked = e.target;
    btnCliked.parentElement.parentElement.remove();
    updatePrice();
}

function cambiarCantidad(e) {
    let cantidad = e.target.value;
    if (isNaN(cantidad) || cantidad <= 0) {
        cantidad = 1;
    }
    updatePrice();
}

function updatePrice() {
    let total = 0;
    for (const producto of productRows) {
        let price = parseFloat(producto.querySelector(".cart-price").innerText.replace("$", ""));
        let cantidad = producto.querySelector(".product-quantity").value;
        total += price * cantidad;
    }
    document.querySelector(".total-price").innerText = "$" + total.toFixed(2);
    document.querySelector(".cart-quantity").textContent = productRows.length;
}

function updatePriceDolar(pesos) {
    productsCards = document.getElementsByClassName("card-product")
    productsRow = document.getElementsByClassName("product-row")
    let i = 0
    for (el of productsCards) {
        if (pesos) {
            el.querySelector(".card-price").innerText = products[i].price + "$";
            document.getElementById("currency").setAttribute("value", "Cambiar a dolares")
        }
        else {
            el.querySelector(".card-price").innerText = (parseFloat(el.querySelector(".card-price").innerHTML) / parseFloat(dolar)).toFixed(2) + "$";
            document.getElementById("currency").setAttribute("value", "Cambiar a pesos")
        }
        i++
    }
    for (el of productsRow) {
        console.log(el)
        console.log(products.find(prod => prod.name == el.id).price)
        if (pesos) {
            el.querySelector(".cart-price").innerText = (parseFloat(products.find(prod => prod.name == el.id).price)) + "$";
        }
        else {
            el.querySelector(".cart-price").innerText = (parseFloat(el.querySelector(".cart-price").innerHTML) / parseFloat(dolar)).toFixed(2) + "$";
        }
    }
    updatePrice()
}

function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}