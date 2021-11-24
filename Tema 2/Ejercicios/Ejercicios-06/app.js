const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

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
// $('body').addEventListener('keypress', e =>{
//     console.log(e)
//     console.log(e.key, e.charCode)
// })

//6
const ej6 = $('.ej6');
const dimensiones = ej6.getBoundingClientRect();
console.log(dimensiones);
let y = dimensiones.y;
let x = dimensiones.x;
$('.ej6').addEventListener('keydown', function(event){
  
    if(event.key === 'w'){
        y -= 10;
        //this.style.top = `${top}px`
        ej6.style.top = `${y}px`;
    }
    else if(event.key === 's'){
        y += 10;
        ej6.style.top = `${y}px`;
    }
    else if(event.key === 'd'){
        x += 10;
        ej6.style.left = `${x}px`;
    }
    else if(event.key === 'a'){
        x -= 10;
        ej6.style.left = `${x}px`;
    }
});


//7
$('.ej7 input').addEventListener('change', function(e){
    this.nextElementSibling.textContent =   this.getAttribute('maxlength') - (this.value.length) + ' caracteres restantes';
})
//8
$('.ej8').addEventListener('mouseover', function(e){
    const showParrafos = ()=>{
        let parrafos = Array.from($$('.ej8 p'));
        parrafos.forEach(p => {
            p.style.display = 'block'
            p.style.color = 'black';
        });
    }
 let target = e.target;
 
 if(target.tagName === 'P'){
    target.style.color = 'red';
    target.addEventListener('mouseleave', () => target.style.display = 'none' );
} else if(target.tagName === 'BUTTON'){
    target.addEventListener('click', showParrafos);
}
});


//9

let popup = window.open('', '', 'height=200,width=150');
// popup.style.position = 'absolute';

popup.addEventListener('mouseover', function(e){
    console.log(window, e)
    let cambioDireccion = e.screenX > 500
    console.log(cambioDireccion)
    popup.moveBy(cambioDireccion ? e.offsetX - 400 : e.offsetX + 400, e.clientY + 100)
});


//10
///NO lo voy a hacer (otra vez)