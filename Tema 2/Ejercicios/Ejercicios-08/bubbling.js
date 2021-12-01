// const padre = document.querySelector('.padre');


// padre.addEventListener('click', function(event){
    
//     const target = event.target;
    
//     if(target.classList.contains('btnRojo')){
//         console.log('Boton rojo')
//     }
//     else if (target.classList.contains('btnVerde')){
//         console.log('Boton verde');
//     }else if(target.classList.contains('btnAzul')) {
//         console.log('boton Azul');
//     }
// });

// const $ = (selector) => document.querySelector(selector);


const tbody = document.querySelector('#tbody')
console.log(tbody);

tbody.addEventListener('click', function(event){
    const target = event.target;
   // console.log(target);
    if(target.classList.contains('btnAzul')){
        let id = parseInt(target.parentElement.parentElement.getAttribute('data-id'));
        console.log(id)
    }else if(target.classList.contains('btnVerde')){
        console.log('HOLA SOY EL VERDE')
    }
}, false);

