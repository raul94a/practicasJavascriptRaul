const $ = selector => document.querySelector(selector);


window.addEventListener("load", function (event) {
    console.log("Hola desde el evento de load");
});

window.onunload = (event) => {
    console.log('The page is unloaded');
};
window.onresize = event => {
    console.log(`Redimensionamiento de la pantalla\nAnchura disponible: ${$('body').getBoundingClientRect().width}`);
}
//1
const b1 = $('.b1');
const b2 = $('.b2');
const b3 = $('.b3');

b1.textContent = 'Button 1'

b1.addEventListener('mouseover', () => console.log('Has entrado al boton'));
b1.addEventListener('click', () => alert('clicked'));



//2

//3
const divEj4 = $('.ej4');
divEj4.addEventListener('mousemove', e => {
    const x = $('#x');
    const y = $('#y');
    x.textContent = 'Coordenada x: ' + e.offsetX;
    y.textContent = 'Coordenada y: ' + e.offsetY;
    const dimensiones = divEj4.getBoundingClientRect();
    $('.ej4 h1').textContent = 'Ejercicio 4 - DENTRO'; 
    
});

divEj4.addEventListener('mouseleave', e => {
    $('.ej4 h1').textContent = 'Ejercicio 4 - FUERA'; 

})

//4

//5
$('body').addEventListener('keypress', e =>{
    console.log(e)
    console.log(e.key, e.charCode)
})

//6

//7

//8

//9

//10