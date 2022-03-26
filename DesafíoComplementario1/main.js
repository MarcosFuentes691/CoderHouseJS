let varFor

let iteraciones = parseInt(prompt("Cantidad de operaciones a realizar"))

let num1 = parseInt(prompt("Ingrese el primer numero"))
let num2 = 0

for(let i = 1; i<=iteraciones; i++){
    let operacion = prompt(`Seleccionar operacion N° ${i}(x,+,-,/)`)
    do{
        num2 = parseInt(prompt(`Ingrese un numero valido para realizar la operacion ${operacion} sobre el numero ${num1}`))
    }while(num2==0 & operacion=='/')
    switch(operacion){
        case "x":
            num1=num1*num2
            break
        case "+":
            num1=num1+num2
            break
        case "-":
            num1=num1-num2
            break
        case "/":
            num1=num1/num2
            break
        default:
            alert("Operacion invalida")
    }
}

alert(`El resultado es ${num1}`)
