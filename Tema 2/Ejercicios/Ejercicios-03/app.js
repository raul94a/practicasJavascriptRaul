//ejercicio 1
let persona = new Object()
   persona.nombre ='Jaime';
   persona.apellido = 'lOGITECH';
   persona.perro = true;
   persona.getNombre = function(){
       return persona.nombre;
   }
   persona.tienePerro = function(){
       return persona.perro ? 'Si': 'No';
   }

  


let ordenador = {
    ram: 7,
    ssd: 500,
    procesador: 'IntelCore 7',
    tieneMasDe8gbRam(){
        return this.ram > 500 ? 'Tiene más de 8 gb RAM' : 'Tiene menos de 8 gb de RAM';
    },
    toString(){
        return `RAM: ${this.ram} gb, SSD: ${this.ssd} gb, procesador: ${this.procesador}`;
    }
}
    
   




console.log(persona, ordenador.toString());
console.log(ordenador.tieneMasDe8gbRam());

//Ejercicio 2
const tvSamsung = {
    nombre: 'TV Samsumg 42"',
    categoria: 'Televisores',
    unidades: 4,
    precio: 345.95,
    importe(){
        return parseFloat((this.unidades * this.precio).toFixed(2)) + ' €'
    }
}

console.log(tvSamsung.importe());

//Ejercicio 3
class Productos{
    
    constructor(nombre, categoria, unidades, precio){
        this.nombre = nombre;
        this.categoria = categoria;
        this.unidades = unidades;
        this.precio = precio;
    }
    importe(){
        return parseFloat((this.unidades * this.precio).toFixed(2)) + ' €'
    }
    getInfo(){
        return `Categoria: ${this.categoria}\nImporte: ${this.importe()}`
    }
    static getCategories(){
        return ['Televisores', 'Telefonia', 'Consolas', 'Ropa'];
    }
    toString(){
        return `${this.categoria}--${this.nombre}`;
    }
    valueOf(){
        return this.unidades;
    }
}

let p1 = new Productos('Tv', 'Televisiones', 5, 200);
let p2 = new Productos('Movil', 'Telefonia', 10, 1000);
let p3 = new Productos('PS5', 'Consolas',1, 500);
console.log(p1.getInfo(),p2.getInfo(),p3.getInfo())

//ej 4
class Televisores extends Productos{
    constructor(nombre, categoria, unidades, precio, tamanio){
        super(nombre, categoria,unidades,precio);
        this.tamanio = tamanio;
    }
    getInfo(){
        return `Nombre: ${this.nombre}\nTamaño: ${this.tamanio}`;
    }
}

let tv = new Televisores('LG 450 Oled', 'televisonres', 5, 100, '45 pulgadas');
console.log(tv.getInfo());
//Ejercicio 5
console.log(Productos.getCategories());
//Ejercicio 6
let productEj6 = new Productos('Camiseta Real Madrid', 'Ropa', 3, 500);
console.log(productEj6.toString());
//Ejercicio 7
let array = [p1,p3,p2];
let arrayCopia = array.slice();
console.log('array NO ordenado', arrayCopia)
console.log(array, array.sort())
//Ejercicio 8
console.log(p1.valueOf() > p2.valueOf());
//ejercicio 9
let p5 = new Productos('Zapatillas running','Calzado deportivo',5,89);
let arrayEj9 = [p1,p2,p3,tv,p5];

function prodsSortByName(array){
    return array.sort(function(a,b){
        if(a.nombre > b.nombre)  {
            return 1
        } else if(a.nombre == b.nombre){
            return 0;
        } else return -1;
    });
}
console.log(prodsSortByName(arrayEj9));

function prodsSortByPrice(array){
    return array.sort(function(a,b){
        if(a.precio > b.precio)return 1;
        else if (a.precio === b.precio) return 0;
        else return -1;
    });
}

prodsSortByPrice(arrayEj9)

function prodsTotalPrice(array){
    let importes = []
    array.forEach(element => {
        importes.push(element.importe());
    });
    return importes;
}

console.log(prodsTotalPrice(arrayEj9));

function prodsWithLowUnits(array, number){
    return array.filter(e => e.unidades < number);
}
console.log(prodsWithLowUnits(arrayEj9, 6));

function prodsList(array){
    let str = "Listado de productos\n";
    array.forEach(e => {
        str += `- Nombre: ${e.nombre} -- Precio: ${e.precio} -- Unidades: ${e.unidades} -- Categoria: ${e.categoria}\n`;

    });
    return str;
}
console.log(prodsList(arrayEj9));