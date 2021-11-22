const $ = selector => document.querySelector(selector);

const manecilla = $('.manecilla');
const minutos = $('.min');
const hora = $('.hora');

//empezamos en el grado menos 90 (girar noventa grados hacia la izquierda)
let degree = -90;
let degreeMin = -90;
let degreeHour = -90;


const intervalo = setInterval(() => {
    degree = degree < 270 ? degree + 6 : -90;
    manecilla.style.transform = `rotate(${degree}deg)`;

    if(degree == -90){
        degreeMin = degreeMin < 270 ? degreeMin + 6 : -90;
        minutos.style.transform = `rotate(${degreeMin}deg)`;
       
        if(degreeMin == -90){
      
            degreeHour = degreeHour < 270 ? degreeHour + 30 : -90;
            hora.style.transform = `rotate(${degreeHour}deg)`;
        }
    } 
    console.log(degree / 6)
}, 1000);




