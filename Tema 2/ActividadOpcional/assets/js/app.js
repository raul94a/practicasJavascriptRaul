//Seleccionamos el botón de enviar y el input
const btnStr = document.getElementById('btnStr');
const inputStr = document.getElementById('inputStr');

function getFecha(){
    let date = new Date();
    return date.getDate() + '/' + (date.getMonth() + 1) +'/' + date.getFullYear();
}

//fecha dia hora #1-5 Titulo 
function parsearInput(){
    let str = inputStr.value;
    let fecha = getFecha();
    console.log(fecha);
}

btnStr.addEventListener('click', parsearInput);