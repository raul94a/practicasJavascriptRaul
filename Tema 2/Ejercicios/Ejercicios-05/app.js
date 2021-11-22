//1
// setTimeout(() =>
//     alert('ALERT A LOS DO SSEGUNDOS'),
//     2000
// )
// let rep = 1;
// const intervalo = setInterval(() => {


//     alert(`repeticion ${rep}`)
//     rep++;
//     if(rep > 10) clearInterval(intervalo);

// }, 3000);



//2


setInterval(() => {
    let hora = new Date()
    document.querySelector('h1').textContent = hora.toLocaleString('es-ES', {hour: 'numeric', minute: '2-digit', second: '2-digit'});
}, 1000);


//3

const array = [window.name, window.status, window.screenX, window.screenY, window.outerWidth, window.outerHeight];
const divChildren = document.getElementById('ej3').children;
let counter = 0;
[...divChildren].forEach(element => {
    element.textContent = array[counter]
    console.log(array[counter])
    counter++;
});

//4
// window.open('','pagina prueba', 'width:=640;height=480').document.write('<h1 style="position:absolute;top:200px;left:100px">Hola desde nueva ventana</h1>')
//5

const createPopUp = () => {
    let body = document.querySelector('body');
    let div = document.createElement('div');
    div.style.padding = '5rem'
    div.style.position = 'absolute';
    
    div.style.left = '40%';
    div.style.background='red';
    let button = document.createElement('button');
    button.textContent = 'X';
    button.addEventListener('click', () => {
        div.remove();
    })
    div.append(button);
    let h1 = document.createElement('h1');
    h1.textContent = 'BIENVENIDO';
    div.append(h1);
    body.append(div);
}
setTimeout(() =>  
    createPopUp()
, 2000);
//6
// let ventana = window.open('','pagina prueba', 'width:=640;height=480')
// ventana.document.write('<h1 style="position:absolute;top:200px;left:100px">Me muevo</h1>');
// setInterval(() =>  {
    
// }, 500)
//7
console.log(location.href)
console.log(location.protocol, location.pathname, location.port)
//8
console.log(history.length, )
history.back()
history.forward()
history.go(-2)
history.go(2);
//9
let n = navigator;
console.log(n.userAgent, n.platform, n.product, n.language, n.cookieEnabled, n.geolocation, n.appCodeName, n.appName, n.appVersion)
//10
let s = screen
console.log('availHeight ' + s.availHeight)
console.log('availWidth ' + s.availWidth)
console.log('ColorDepth ' +s.colorDepth)
console.log('height ' +s.height)
console.log('width ' +s.width)
console.log('pixelDepth ' +s.pixelDepth)