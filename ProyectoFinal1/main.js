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

do {
    addProduct()
} while (confirm("¿Desea añadir otro producto a su carrito?"))
products.forEach(element => {
    element.quotaPrice = quotasPrice(element.price);
    totalBuy.price += element.price
    printPrice(element)
});
totalBuy.quotaPrice = quotasPrice(totalBuy.price)
printPrice(totalBuy)


function addProduct() {
    do {
        var name = prompt("Nombre del producto");
    } while (name == "")
    do {
        var price = parseFloat(prompt("Ingrese precio"))
    } while (price < 1)
    do {
        var payMethod = prompt("Efectivo(E) o Cuotas(C)").toUpperCase()
    } while (payMethod != 'E' && payMethod != 'C')
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
    switch (product.payMethod) {
        case 'E':
            alert(`El precio de ${product.name} pagando en efectivo es de ${product.price}$`)
            break;
        case 'C':
            for (let i = 0; i < quotas.length; i++) {
                alert(`El precio de ${product.name} pagando en cuotas es de ${quotas[i]} cuotas de ${(product.quotaPrice[i] / quotas[i]).toFixed(2)}$ sumando un total de ${product.quotaPrice[i]}$`)
            }
            break;
        default:
            alert(`El precio total de su carrito pagando en efectivo es de ${product.price}$`)
            for (let i = 0; i < quotas.length; i++) {
                alert(`El precio total de carrito pagando en cuotas es de ${quotas[i]} cuotas de ${(product.quotaPrice[i] / quotas[i]).toFixed(2)}$ sumando un total de ${product.quotaPrice[i]}$`)
            }
            break;
    }
}


