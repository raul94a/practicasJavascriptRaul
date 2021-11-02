//ejercicio 1
let miVariable = 'Hola';
console.log(miVariable);
miVariable = 9;
console.log(miVariable);
miVariable = [[[[]]]];
console.log(miVariable);


//ejercicio 2
/*

var -> asigna una variable de forma global
let -> asigna una variable de forma local
const -> asigna una variable que no puede modificar su valor (aunque en el caso de objetos y arrays si
     pueden modificar los elementos que estos contienen).


*/

//ejercicio 3
/*

El hoisting es el hecho en el que la declaración de variables y funciones son «movidas» al inicio del bloque al que pertenecen
de tal forma que puede usarse una función en lineas anteriores a la linea de declaración de dicha función.

*/

//ejercicio 4
function potencia(a = 2, b = 2) {
    return Math.pow(a, b);
}
console.log(potencia());
console.log(potencia(3, 2));
console.log(potencia(5))

//ejercicio5

let funOriginal = function (str) {
    return str;
}

let funCopia = funOriginal;
console.log(funOriginal('Cadena de texto'), funCopia('Cadena de texto'));

//ejercicio 6

let funArrow = str => str;
let funArrayCopia = funArrow;

console.log(funArrow('arrow'), funArrayCopia('arrowcopia'));

//ejercicio 7
function suma(a, b) {
    return a + b;
}
let sumaArrow = (a, b) => a + b;
let sumarAnonima = function (a, b) {
    return a + b;
}

console.log(suma(0, 1), sumaArrow(2, 5), sumarAnonima(5, 6));

function multiplica(a, b) {
    return a * b;
}

let multiplicaArrow = (a, b) => a * b;
let multiplicaAnonima = function (a, b) {
    return a * b;
}

console.log(multiplica(0, 1), multiplicaArrow(2, 5), multiplicaAnonima(5, 6));

function potencia(a, b) {
    return Math.pow(a, b);
}
let potenciaArrow = (a, b) => Math.pow(a, b);
let potenciaAnonima = function (a, b) {
    return Math.pow(a, b);
}
console.log(potencia(0, 1), potenciaArrow(2, 5), potenciaAnonima(5, 6));

function cubo(a) {
    return Math.pow(a, 3);
}
let cuboArrow = a => Math.pow(a, 3);
let cuboAnonima = function (a) {
    return Math.pow(a, 3);
}
console.log(cubo(1), cuboArrow(5), cuboAnonima(6));

function mayor(a, b) {
    if (a > b) return a;
    return b;
}
mayorArrow = (a, b) => a > b ? a : b
mayorAnonima = function (a, b) {
    if (a > b) return a;
    return b;
}
console.log(mayor(0, 1), mayorArrow(20, 15), mayorAnonima(50, 6));

/* LAS LLAVES DE LA FUNCION SE PUEDEN ELIMINAR CUANDO LA FUNCIÓN OCUPA UNA LINEA EN LAS ARROW FUNCTIONS */

//Ejercicio 8

mayorArrow = (a, b) => a > b ? a : b

//Ejercicio 9
document.getElementById('ej9').addEventListener('click', () => {
    let option = parseInt(prompt('Introduce un número del 1 al 5'));
    if (option == 1) {
        console.log('Has elegido sumar 1 y 2. Resultado: ' + suma(1, 2));
    }
    else if (option == 2) {
        console.log('Has elegido multiplicar 1 y 2. Resultado: ' + multiplica(1, 2));

    }
    else if (option == 3) {
        console.log('Has elegido elevar 10 a 2. Resultado: ' + potencia(10, 2));

    } else if (option == 4) {
        console.log('Has elegido elevar 100 a 3. Resutlado: ' + cubo(100));

    }
    else if (option === 5) {
        console.log('Has elegido ver que numero es mayor entre 12156545610 y 13156545611. Resultado: ' + mayor(12156545610, 13156545611));

    } else {
        alert('ERROR');
    }


    //ejercicio 10
    switch (option + 1) {
        case 1:
            console.log('Has elegido sumar 1 y 2. Resultado: ' + suma(1, 2));

            break;
        case 2:
            console.log('Has elegido multiplicar 1 y 2. Resultado: ' + multiplica(1, 2));

            break;
        case 3:
            console.log('Has elegido elevar 10 a 2. Resultado: ' + potencia(10, 2));

            break;
        case 4:
            console.log('Has elegido elevar 100 a 3. Resutlado: ' + cubo(100));

            break;
        case 5:
            console.log('Has elegido ver que numero es mayor entre 12156545610 y 13156545611. Resultado: ' + mayor(12156545610, 13156545611));

            break;
        default:
            break;
    }

});

//ejercicio 11
let array = [52, 7, 2, 28, 3, 52, 23, 2, 81];

console.log('ForEach');
array.forEach(el => console.log(el));
console.log('FOR OF');
for (let a of array) console.log(a);
console.log('FOR IN');
for (let a in array) console.log(array[a]);
console.log('FOR NORMAL');
for (let i = 0; i < array.length; i++) console.log(array[i]);

let longitud = 0;
console.log('WHILE');
while (longitud < array.length) {
    console.log(array[longitud]);
    longitud++;
}

long = 0;
console.log('DO WHILE');
do {
    console.log(array[long]);
    long++;

} while (long < array.length);

//EJERCICIO 12
let notaMedia = array => {
    let nota = 0;
    array.forEach(e => nota += e);
    return (nota / array.length);
}

let notaMedia2 = array => {
    let nota = 0;
    for (let a of array) {
        nota += a;
    }
    return (nota / array.length);
}

let notaMedia3 = array => {
    let nota = 0;
    let length = array.length;
    for (let i = 0; i < length; i++) {
        nota += array[i];

    }
    return nota / length;
}

console.log(notaMedia([1, 2, 3, 4, 5]), notaMedia2([10, 8, 4, 6, 4, 10, 10, 2]), parseFloat(notaMedia3([5, 8, 9, 10, 9, 6, 7.5]).toFixed(2)));

//Ejercicio 13
console.log('EJERCICIO 13')
array = ['5' / 2, //2.5 , se infiere que el '5' es 5
'5' - null, //'5'
'5' - undefined,  //sale NaN porque se está restando un string a un valor no definido
'5' * true, //da resultado 5 porque 5 * true (1) = 5
'5' * false, //da cero porque se infiere el 5 como entero y el false como 0... 5x0 = 0
'5' * 'Hola', //NaN porque * es para multiplicar numeros. String x String es NaN
5 + 'Hola', //concatenación del numero con el string => 5hola
5 + '5', //lo mismo que el anterior => 55
'5' + 5, //igual que el anterior
'5' > 4, //infiere el 5 como como entero y devuelve tru
5 > '4', //igual que el anterior solo que con el '4'
'5' > '40', //devuelve true porque '5' > '4'. En este tipo de comparaciones cuenta solo el primer digito
'5' == 5, //el '5' se infiere y da true
5 == 5.0, //true. Son el mismo valor
0 == false, //true. 0 es false
'' == false, //true porque la cadena vacía es considerada un valor falsy
' ' == false, //true, es un valor falsy también.
[] == false, //da true porque el array vacío es un falsy
null == false, //false porque null no es ningún valor y ningun valor igual a cualquier cosa excepto a null es false
undefined == false, //false por algo parecido al elemento anterior. Undefined se asocia a las variables no inicializadas, por tanto no tiene valor
undefined == null //true. Ambos no tienen valor
]

array.forEach(el => console.log(el));

//ejercicio 14
let notaMediaModificada = (array, decimales = 1) => {
    let nota = 0;
    array.forEach(e => nota += e);
    return (nota / array.length).toFixed(decimales);
}
console.log(notaMediaModificada([7.5, 1, 7.3, 6.69, 5.21, 7, 0.222, 8, 7, 4]), notaMediaModificada([10, 8.8, 7, 6.3, 5, 7, 10, 1, 7, 3], 3));

//ejercicio 15
console.log('EJERCICIO 15')
let num = parseInt('99');
let numFloat = parseFloat('2.569');
console.log('isNaN => 5 * undefined: ' + isNaN(5 * undefined));
console.log('isFinite 5 elevado 10: ' + isFinite(Math.pow(5, 10)), '\nIsFinite undefined: ' + isFinite(undefined));
console.log('Number: ' + Number(5));
console.log('Boolean: ' + Boolean(5.6666));
console.log('String: ' + String('Introducción a JS'));

//ejercicio 16
const sumMod = (a, b) => {
    if (isNaN(a) || isNaN(b)) {
        alert('ERROR AL INTRODUCIR LOS DATOS EN LA FUNCIÓN');
        return;
    }
    return parseInt(a) + parseInt(b);
}
console.log(sumMod('HOLAAaa', 2));

//EJERCICIO 17
console.log('EJERCICIO 17');
let string = 'Esto es una cadena de texto';
//divide una cadena de texto, transformándolo en un array. En este caso se escoge como patrón los espacios, es decir
//cuando encuentre un espacio introduce todo lo que la función haya leido hasta ese momento en la nueva posición del array que se
//está generadno
array = string.split(' ');
console.log(array)
//extrae parte de la cadena 
console.log(string.substring(0, 2));
//pasa a minusculas
console.log(string.toLocaleLowerCase());
//pasa a mayus
console.log(string.toUpperCase());
//nos da la longitud de la cadena
console.log(string.length);

//EJERCICIO 18
let dni = dni => {
    let string = 'TRWAGMYFPDXBNJZSQVHLCKE';
    let array = string.split('');

    let parteNumerica = dni.substring(0, dni.length - 1);
    // console.log(parteNumerica);
    let resultado = parteNumerica % 23;
    //console.log(resultado);
    let letra = array[resultado];
    console.log(`La letra correspondiente a tu numero del DNI es: ${array[resultado]}`)
    // console.log(letra);
    //console.log(dni.substring(dni.length -1))

    return letra === dni.substring(dni.length - 1);

}

console.log("¿El dni es correcto?: " + dni('26052027L'));

//EJERCICIO 19
let a = 5;
let b = 'años';
let c = 'tiene Flavio';
alert(`${a} ${b} ${c} `);

//Ejercicio 20
function retirar(saldo, cantidad) {
    if (saldo < cantidad) {
        throw 'El saldo es menor que la cantidad que tienes en tu cuenta';
    }
    else if(saldo == cantidad){
        throw 'Error. El saldo a retirar es la misma que le dinero que hay en la cuenta.';
    }
    else if(saldo < 100) throw 'Error. El dinero que hay en tu cuenta es menor que 100 €. No se puede sacar dinero.'
    return saldo - cantidad;
}

/*Ejercicio 21

1. Intentear no usar variables globales. Usar let y const.
2. Usar el operador ternario cuando sea necesario
3. Indentar el código
4. No repetir código. Separar en funciones.
5. camelCase para la declaración de variables y funciones


*/



