const persona = new Persona("Victoria", 1);
persona.mostrarDetalles();


// funcion simple
function sumar(a: number, b: number): number {
        return a + b;
};

const resultadoSuma = sumar(11, 48);
console.log("El resultado de la suma es: " + resultadoSuma);


// funcion de flecha
const suma = (a: number, b: number): number => {
    return a + b;
};
const resultadoSumaFlecha = suma(7, 8);
console.log("El resultado de la suma es: " + resultadoSumaFlecha);


// funcion de flecha sin parentesis alrededor de un solo parametro
const esPar = num => num % 2 === 0;
console.log("El numero es par? ", esPar(8));


// funcion de flecha con cuerpo implicito
const saludar = nombre => `Hola, ${nombre}!`;
console.log(saludar("Diana"));


// funcion flecha en Mapeo de Arreglo
const numeros = [1, 2, 3, 4, 5];
const alCuadrado = numeros.map(num => num * num);

console.log("Arreglo Original: ", numeros);
console.log("Arreglo al cuadrado: ", alCuadrado);