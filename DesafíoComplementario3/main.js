class Product {
    constructor(name, price, payMethod) {
        this.name = name;
        this.price = price;
        this.quotaPrice = [];
        this.payMethod = payMethod;
    }
}

const inflationRate = 3.8
const quotas = [3, 6, 9, 12]
var products = []
var totalBuy = new Product("totalBuy", 0, [0], "T")

if (document.getElementById("productName").value != "Nombre" && document.getElementById("price").value != "Precio") {
    addProduct()
    products.forEach(element => {
        element.quotaPrice = quotasPrice(element.price);
        totalBuy.price += element.price
        printPrice(element)
    });
    totalBuy.quotaPrice = quotasPrice(totalBuy.price)
    printPrice(totalBuy)
    document.getElementById("productName").innerText = "Nombre"
    document.getElementById("price").innerText = "Precio"
}


function addProduct() {
    var name = document.getElementById("productName")
    var price = document.getElementById("price")
    var payMethod = document.getElementById("payMethod")
    products.push(new Product(name, price, payMethod))
}

function quotasPrice(price) {
    let quotasPrice = []
    for (let i = 0; i < quotas.length; i++) {
        let tempPrice = price
        for (let k = 0; k < quotas[i]; k++) {
            tempPrice = tempPrice * (inflationRate / 100 + 1)
        }
        quotasPrice.push(tempPrice.toFixed(2))
    }
    return quotasPrice
}

function printPrice(product) {
    let nodo = document.createElement("div");
    switch (product.payMethod) {
        case 'E':
            document.getElementById("cosas").innerHTML = `El precio de ${product.name} pagando en efectivo es de ${product.price}$`
            break;
        case 'C':
            for (let i = 0; i < quotas.length; i++) {
                nodo.innerHTML = `El precio de ${product.name} pagando en cuotas es de ${quotas[i]} cuotas de ${(product.quotaPrice[i] / quotas[i]).toFixed(2)}$ sumando un total de ${product.quotaPrice[i]}$`
                document.getElementById("cosas").appendChild(nodo);
            }
            break;
        default:
            nodo.innerHTML = `El precio total de su carrito pagando en efectivo es de ${product.price}$`
            document.getElementById("cosas").appendChild(nodo);
            for (let i = 0; i < quotas.length; i++) {
                nodo.innerHTML = `El precio total de carrito pagando en cuotas es de ${quotas[i]} cuotas de ${(product.quotaPrice[i] / quotas[i]).toFixed(2)}$ sumando un total de ${product.quotaPrice[i]}$`
                document.getElementById("cosas").appendChild(nodo);
            }
            break;
    }
}


