class Persona {
    nombre: string;
    edad: number;

    constructor(nombre: string, edad: number){
        this.nombre = nombre;
        this.edad = edad;
    }

    // a las funciones de este tipo se les llama METODO (metodo de clase) y es porque estan dentro de una clase
    mostrarDetalles(){
        console.log(`Nombre: ${this.nombre}, Edad: ${this.edad}`);
    }
}

// solo fuera de las clases si se tiene que declarar FUNCTION
function restar(a: number, b: number): number {
        return a - b;
    }