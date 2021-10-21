//ejercicio 1
console.log('EJERCICIO 1')
let array = new Array(3, 7, 6, 9, 2);
let arrayJson = new Array('{','a: 3','b: 7', 'c: 6', 'd: 9', 'e: 2', '}');

//ejercicio 2
console.log('EJERCICIO 2')
const meses = [];
meses.push('junio');
for(let mes of ['enero', 'febrero', 'marzo', 'abril', 'mayo'].reverse()){
    meses.unshift(mes);
}
for(let mes of ['julio','agosto','septiembre','octubre','noviembre','diciembre']){
    meses.push(mes);
}
console.log(meses);

//ejercicio 3
console.log('EJERCICIO 3')
const copiaMeses = meses.slice();

for(let i = 0; i < meses.length; i++){
    if(i < 5) copiaMeses.shift();
    else if(i > 5) copiaMeses.pop();
}
console.log(copiaMeses);

// ejercicio 4
console.log('EJERCICIO 4')
let listaCompra = ['Peras', 'Manzanas', 'Kiwis', 'Plátanos','Mandarinas'];
listaCompra.splice(1,1);
console.log(listaCompra)
listaCompra.splice(3,0, 'Naranjas', 'Sandía');
console.log(listaCompra);
listaCompra.splice(1, 1, 'Cerezas', 'Nísperos');
console.log(listaCompra);

//ejercicio 5
console.log('EJERCICIO 5')
function ordenar(array){
    return array.sort(function(a, b){
        return a - b;
    });
}
console.log(ordenar([10,3,4,7,0,9,6,8,3.7]));

//ejercicio 6
console.log('EJERCICIO 6')
function ordenarPorUltimaLetra(array){
 
    return array.sort(function(a,b){

        let str1 = a.split('').reverse().join('')[0];
        let str2 = b.split('').reverse().join('')[0];
        
        return str1.localeCompare(str2);
    })
}

console.log(ordenarPorUltimaLetra(['hola', 'esto', 'wwwuw','abcd', 'aaa', 'zetazetaz']));

//Ejercicio 7
console.log('EJERCICIO 7')
/* EJEMPLO DE PROGRAMACION IMPERATIVA: generación de números aleatorios */

//quiero generar 5 numeros aleatorios y guardarlos en un array...

let a = parseInt(Math.random() * 10);
let b = parseInt(Math.random() * 10);
let c = parseInt(Math.random() * 10);
let d = parseInt(Math.random() * 10);
let e = parseInt(Math.random() * 10);
console.log(a, b, c, d, e)
let arrayExplicacionImperativa = [a,b,c,d,e];
console.log(arrayExplicacionImperativa);

//Ahora bien...hemos repetido la misma tarea 5 veces. En realidad para esta tarea sería necesaria la utilización de bucles...
//para ello existe la programación funcional, es decir, que mediante funciones podemos evitar bucles para llegar al mismo objetivo.

function generarAleatorio(rango){return parseInt(Math.random() * rango)};

//no obstante...esto no nos evitaría repetir 5 veces esta funcion. ¿Porqué no crear una función que nos devuelva un array de numeros aleatorios de longitud deseada, ya sea 5 o 20?
function generarListaNumerosAleatorios(longitud, rango){
    let array = [];
    for(let i = 0; i < longitud;i++){
        array.push(generarAleatorio(rango));
    }
    return array;
}
//ahora podemos generar con una simple función un array formado por la cantidad que queramos de números aleatorios en el rango que queramos
console.log(generarListaNumerosAleatorios(10, 80));

//ejercicio 8
console.log('EJERCICIO 8')
const semana = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

console.log(semana.filter(el => el.startsWith('M')));
console.log('El primer dia de la semana que empieza por M:', semana.find(e => e.startsWith('M')));
console.log("El primer dia de la semana que empieza por M esta en la posición",semana.findIndex(e => e.startsWith('M')));
console.log('¿Algún día comienza por S?', semana.some(e => e.startsWith('S')) ? 'si, ' + semana.find(e => e.startsWith('S')): 'no');
console.log('¿Todos los días acaban con s?', semana.every( e => e.endsWith('s')) ? 'si': 'no');
let semanaMayus = semana.map(e => e.toUpperCase());
console.log(semanaMayus);
let semanaMinus = Array.from(semanaMayus.map(e => e.toLowerCase()));
console.log(semanaMinus);
let semanasComas = semana.reduce((e, a) => e + ',' + a);
console.log(semanasComas);
let posicion = 0;
semana.forEach(e => {
    console.log(`Posicion: ${posicion} => ${e}`)
    posicion++;
});
console.log('¿Se incluye el día Martes?',semana.includes('Martes') ? 'Sí': 'No');

//Ejercicio 9
console.log('EJERCICIO 9');
let notas = generarListaNumerosAleatorios(10,10);
//nota mas baja
console.log(notas.sort((a, b) => a - b)[0]);
//nota mas alta
console.log(notas.sort((a, b) => b - a)[0]);
//media
console.log(notas.reduce((anterior, actual) => anterior + actual) / notas.length);
//hay algun cinco
console.log(notas.includes(5)  ? 'Hay algún 5' : 'No hay 5');
//otro array restando un punto a cada nota
let arrayNotasDos = notas.map(e => e - 1);
console.log(arrayNotasDos);
let arrayNotasSumarUnPuntoASuspensas = notas.map(e => {
    if(e < 5){
        return e += 1;
    }
    return e;
});
console.log(notas, arrayNotasSumarUnPuntoASuspensas);

//ejercicio 10
console.log('EJERCICIO 10');
let notasRef = notas;
let notasValor = notas.slice();
//añadimos un elemento a notas con push
notas.push(99);
console.log(notasRef, notasValor);

//ejercicio 11
console.log('EJERCICIO 11')
function pruebaRestSpread(...a){
    console.log('REST')
    let media = 0;
    let suma = a.reduce((a, b) => a + b);
    media = suma / a.length;
    console.log('Media',media);
    console.log('SPREAD')
    let array = [...a,88999];
    console.log(array)
}
pruebaRestSpread(2,5,6,8,9,8,5);

//Ejercicio 12
console.log('EJERCICIO 12')
let  [lunes, martes, miercoles, jueves, viernes,sabado, domingo] = semana;
console.log(lunes, martes, miercoles, jueves, viernes, sabado, domingo);
let [l, m, x, j, v, ...finde] = semana;
console.log(l, m, x, j, v, finde);
let [lun, ,mier, ,vier, ...find] = semana;
console.log(lun, mier, vier, finde);
