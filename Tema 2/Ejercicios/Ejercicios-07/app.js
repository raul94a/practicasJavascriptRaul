//*1

//2 y 3
const getRandom = (max = 100) => {
    const array = [];
    const inicio = Date.now();
 
    while(array.length < max){
        numero = parseInt(Math.random() * 300);
        if(!array.includes(numero)){
            array.push(numero);
        }
    }

    const final = Date.now();

    console.log(`Tiempo de ejecución para ${max} aleatorios unicos: ${final - inicio} ms\n`)
    
    return array.sort((a, b)=>{
        if(a > b) return 1;
        else if(a < b) return - 1;
        else return 0;
    });

};
//3
getRandom(200)
getRandom(250)
getRandom(280)

//4

let fecNac1 = new Date('20-Jul-1994');
console.log(fecNac1)
let fecNac2 = new Date(1994, 6 , 20);
console.log(fecNac2)

//dia de la semana que nací
console.log('Nací un ' + fecNac1.toLocaleString('es-ES', {weekday:'long'}))
fecNac1.setFullYear(2021);
console.log('Fecha modificada' + fecNac1);
console.log('Este año cumplo años un ' + fecNac1.toLocaleString('es-ES', {weekday:'long'}))

const diasTranscurridosDesdeQueNaci = (fechaCumple) => {
    let milliseconds = new Date() - fechaCumple
    console.log(Math.round(milliseconds / (1000 * 3600 * 24)));
}
diasTranscurridosDesdeQueNaci(fecNac2);
//muestra fec1 en 5 formatos difrentes
console.log(fecNac1);
console.log(fecNac1.toJSON()),
console.log(fecNac1.toDateString());
console.log(fecNac1.toLocaleString('es-ES',{day:'numeric', month:'numeric', year:'numeric'}))
console.log(fecNac1.toLocaleString('es-ES',{day:'2-digit', month:'long', year:'2-digit'}))

console.log(fecNac2 > new Date(2021,0,1))
//5
const fechaActual = () => {
    let date = new Date();
    console.log(`Estamos a ${date.toLocaleString('es-ES', {weekday:'long'})} ${ date.getDay()} de ${date.toLocaleString('es-ES',{month: 'long', year:'numeric'})} y son las ${date.toLocaleString('es-ES', {hour:'2-digit', minute:'2-digit'})}`);
}
fechaActual()
//6
const calcularDias = () => {
    let date = new Date();
    let enero2021 = new Date(2021,0,1);
    let enero2000 = new Date(2000,0,1);
    let diferenciaActual2021 = date - enero2021;
    let diferenciaActual2000 = date- enero2000;

    console.log('Dias transcurridos desde 1/1/2000: ' + Math.round(diferenciaActual2000 / (3600 * 1000 * 24)) + ' dias');
    console.log('Dias transcurridos desde 1/1/2000: ' + Math.round(diferenciaActual2021 / (3600 *1000 * 24)) + ' dias');

}
calcularDias()