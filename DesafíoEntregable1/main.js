const inflationRate = 3.8


do{
    var category = parseInt(prompt("Categoría de producto, seleccione del 1 al 5"));
}while((category<1) || (category>5))
do{
    var minPrice = parseInt(prompt("Ingrese rango minimo de precio"))
}while(minPrice<1)
do{
    var maxPrice = parseInt(prompt("Ingrese rango maximo de precio"))
}while(maxPrice<minPrice)

tempPrice=(minPrice+maxPrice)/2
//Idealmente esta primer parte sería una especie de busqueda de productos
//y en vez de una variable tempPrice habría un precio de un producto especifico

do{
    var payMethod = prompt("Efectivo(E) o Cuotas(C)").toUpperCase()
}while(payMethod!='E' && payMethod!='C')

if(payMethod=='C'){
    do{
        var quotas = parseInt(prompt("Ingrese cantidad de cuotas(3,6,9,12)"))
    }while(quotas!=3 && quotas!=6 & quotas!=9 && quotas!=12)
    let quotaPrice=quotasPrice(quotas,tempPrice).toFixed(2)
    alert(`El precio de su producto de categoria ${category} es de ${quotas} cuotas de ${quotaPrice} sumando un total de ${quotaPrice*quotas.toFixed(2)}, en efectivo sería de ${tempPrice}`)
}
else{
    alert(`El precio de su producto de categoria ${category} pagando en efectivo es ${tempPrice}`)
}



function quotasPrice(quotas,price) {
    for(let i=0;i<quotas;i++){
        price=price*(inflationRate/100+1)
    }
    return price/quotas
}