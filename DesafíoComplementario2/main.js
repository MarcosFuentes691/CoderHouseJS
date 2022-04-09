const inflationRate = 3.8
const quotas=[3,6,9,12]

class Product {
    constructor(name,price,category,quotaPrice) {
        this.name = name;
        this.category = category;
        this.price = price;
        this.quotaPrice = quotaPrice;
    }
}

do{
    var category = parseInt(prompt("Categoría de producto, seleccione del 1 al 5"));
}while((category<1) || (category>5))
do{
    var minPrice = parseFloat(prompt("Ingrese rango minimo de precio"))
}while(minPrice<1)
do{
    var maxPrice = parseFloat(prompt("Ingrese rango maximo de precio"))
}while(maxPrice<minPrice)

tempPrice=(minPrice+maxPrice)/2

var productoBuscado = new Product("tempName",tempPrice,category,tempPrice)

do{
    var payMethod = prompt("Efectivo(E) o Cuotas(C)").toUpperCase()
}while(payMethod!='E' && payMethod!='C')

if(payMethod=='C'){
    let quotaPrices= quotasPrice(productoBuscado.price)
    for(let i=0;i<quotaPrices.length;i++){
        alert(`El precio de su producto de categoria ${productoBuscado.category} en ${quotas[i]} cuotas de ${(quotaPrices[i]/quotas[i]).toFixed(2)}$ sumando un total de ${quotaPrices[i]}$`)
    }
    alert(`En cambio el precio de su producto de categoria ${productoBuscado.category} pagando en efectivo es ${productoBuscado.price}$`)
}
else{
    alert(`El precio de su producto de categoria ${productoBuscado.category} pagando en efectivo es ${productoBuscado.price}$`)
}



function quotasPrice(price) {
    let quotasPrice=[]
    for(let i=0;i<quotas.length;i++){
        let tempPrice=price
        for(let k=0;k<quotas[i];k++){
            tempPrice=tempPrice*(inflationRate/100+1)
        }
        quotasPrice.push(tempPrice.toFixed(2))
    }
    return quotasPrice
}


