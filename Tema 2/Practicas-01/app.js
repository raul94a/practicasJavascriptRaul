/* Practica 1 */

const btnEnviar = document.getElementById('btnEnviar');
const input = document.getElementById('input');
const p = document.querySelector('section p');

const limpiar = object => {
    object.textContent = '';
};
const limpiarInput = input => {
    input.value = '';
};

const imprimirResultado = () => {
    limpiar(p);
    let edad = input.value;
    //console.log(edad)
    if (edad.toString().split('.').length > 1) {
        p.textContent = 'Has introducido un número decimal. Introduce números enteros únicamente.'
        return;
    }
    edad = parseInt(input.value);
    //console.log(edad)
    limpiarInput(input);

    if (isNaN(edad)) {
        p.textContent = 'Error. Has introducido un valor no numérico';
        return;
    }


    if (edad < 0) {
        0
        p.textContent = 'La edad debe ser positiva';
    }
    else if (edad >= 0 && edad < 18) {
        p.textContent = 'Menor de edad';
    }
    else if (edad > 17 && edad < 65) {
        p.textContent = 'Trabajando o estudiando';
    } else {
        p.textContent = 'Jubilado';
    }
    return;

};

btnEnviar.addEventListener('click', imprimirResultado);

/* Practica 2 */
const time = new Date('October 16, 2021 15:00');
let horas = time.getHours();
let minutos = time.getMinutes();
const hora = { 'horas': horas, 'minutos': minutos };

function calcularMinutosTotales(hora) {
    return hora['horas'] * 60 + hora['minutos'];
}
function calcularIntervalo(horaInicio, horaFinal, intervalo) {
    let minutosTotalesIntervalo = calcularMinutosTotales(horaFinal) - calcularMinutosTotales(horaInicio);
    return parseInt(minutosTotalesIntervalo / intervalo);
}
function configurarHora(hora) {
    let horas = hora['horas'];
    let minutos = hora['minutos'];
    return `${horas < 10 ? '0' + horas : horas}:${minutos < 10 ? '0' + minutos : minutos}\n`;
}
function crearParrafo() {
    return document.createElement('p');
}
//muestra el intervalo de tiempo de 15 en 15 minutos
//horaInicio y horaFinal son objetos de js co la siguiente estructura {'horas': horas, 'minutos': minutos}
function mostrarIntervalo(horaInicio, horaFinal, intervalo, idElemento) {
    const seccionIntervalos = document.getElementById(idElemento);
    let numeroIntervalos = calcularIntervalo(horaInicio, horaFinal, intervalo);
    seccionIntervalos.append(document.createElement('p').textContent = configurarHora(horaInicio));
    for (let i = 0; i < numeroIntervalos; i++) {
        horaInicio['minutos'] += intervalo;
        if (horaInicio['minutos'] >= 60) {
            horaInicio['minutos'] -= 60;
            horaInicio['horas'] += 1;
        }
        let parrafo = crearParrafo();
        parrafo.textContent = configurarHora(horaInicio);
        seccionIntervalos.append(parrafo);

    }
}

mostrarIntervalo(hora, {
    'horas': 17,
    'minutos': 00
}, 15, 'intervalos');

/* ejercicio 3 */
//con las funciones que he hecho se podría hacer, solo faltaría
//generar un input en el navegador, recoger datos y validarlos y pasarselos a la funcion de mostrarIntervalo
const btnIntervalo2 = document.getElementById('btnIntervalo2');

const generarHora = (hora, minutos) => {
    return { "horas": hora, "minutos": minutos };
}
function limpiarIntervaloDos() {
    let els = document.getElementById('spot-intervalo-2').childNodes;
    for (let el of els) {
        el.textContent = '';
    }
}
function mostrarIntervalo2() {
    limpiarIntervaloDos();
    let h1 = parseInt(document.getElementById('h1').value);
    let m1 = parseInt(document.getElementById('m1').value);
    let horaInicio = generarHora(h1, m1);

    let h2 = parseInt(document.getElementById('h2').value);
    let m2 = parseInt(document.getElementById('m2').value);
    let horaFinal = generarHora(h2, m2);

    let intervaloDos = parseInt(document.getElementById('intervaloDos').value);

    console.log(horaInicio, horaFinal, intervaloDos)
    if (h2 >= h1) {
        if (m2 >= m1) {
            mostrarIntervalo(horaInicio, horaFinal, intervaloDos, 'spot-intervalo-2');

        }
    }
}
btnIntervalo2.addEventListener('click', mostrarIntervalo2);

/* ejercicio 4 */
const btnPass = document.getElementById('button-pass');
const resultPass = document.getElementById('pass-result');
const listaError = document.getElementById('lista-error');
const passMsj = document.getElementById('pass-msj');

function crearLista() {
    return document.createElement('li');
}
function contieneMayus(password) {
    let mayus = "QWERTYUIOPASDFGHJKLÑZXCVBNM";
    //let array = mayus.split('');
    //console.log(array);
    let contieneMayus = false;
    password.split('').forEach(el => {
        if (mayus.includes(el)) {
            contieneMayus = true;
        }
    });
    return contieneMayus;
}
function contieneMinus(password) {
    let minus = ("QWERTYUIOPASDFGHJKLÑZXCVBNM").toLowerCase();
    let contieneMinus = false;
    password.split('').forEach(el => {
        if (minus.includes(el)) {
            contieneMinus = true;
        }
    });
    return contieneMinus;
}
function longitudMayorQueOcho(password) {
    return password.length >= 8;
};
function contieneNumero(password) {
    let numeros = "0123456789";
    let contieneNumeros = false;
    password.split('').forEach(el => {
        if (numeros.includes(el)) {
            contieneNumeros = true;
        }
    });
    return contieneNumeros;
}
function contieneCaracteresEspeciales(password) {
    let caracteres = "@-_=*+$#";
    let contieneCaracteres = false;
    password.split('').forEach(el => {
        if (caracteres.includes(el)) {
            contieneCaracteres = true;
        }
    });
    return contieneCaracteres;
}


function fuerzaPassword() {
   
    let password = document.getElementById('input-pass').value;
    let contador = 0;

    if (!contieneCaracteresEspeciales(password)) {
        contador++;
        document.getElementById('especial').style.color='red';
        document.getElementById('especial').style.borderBottom='2px solid red';

    }else{
        document.getElementById('especial').style.color='green';
        document.getElementById('especial').style.borderBottom='2px solid green';
    }

    if (!contieneMayus(password)) {
        contador++;
        document.getElementById('mayus').style.color='red';
        document.getElementById('mayus').style.borderBottom='2px solid red';
    }else{
        document.getElementById('mayus').style.color='green';
        document.getElementById('mayus').style.borderBottom='2px solid green';
    }
    if (!contieneMinus(password)) {
        contador++;
        document.getElementById('minus').style.color='red';
        document.getElementById('minus').style.borderBottom='2px solid red';
    }else{
        document.getElementById('minus').style.color='green';
        document.getElementById('minus').style.borderBottom='2px solid green';
    }
    if (!contieneNumero(password)) {
        contador++;
        document.getElementById('numero').style.color='red';
        document.getElementById('numero').style.borderBottom='2px solid red';
    }else{
        document.getElementById('numero').style.color='green';
        document.getElementById('numero').style.borderBottom='2px solid green';
    }
    if (!longitudMayorQueOcho(password)) {
        contador++;
        document.getElementById('longitud').style.color='red';
        document.getElementById('longitud').style.borderBottom='2px solid red';
    }else{
        document.getElementById('longitud').style.color='green';
        document.getElementById('longitud').style.borderBottom='2px solid green';
    }

    if (contador == 0) {
        passMsj.style.color = 'green';

        passMsj.textContent = 'La contraseña es segura';
    } else if (contador <= 2) {
        passMsj.style.color = 'orange';

        passMsj.textContent = 'La contraseña es poco segura';

    } else {
        passMsj.style.color = 'red';
        passMsj.textContent = 'La contraseña es débil. Te convendría pensar una contraseña más segura';

    }
}

let a = document.getElementById('input-pass');
console.log(a);
a.addEventListener('keyup', fuerzaPassword);


/* Ejercicio 5 */


const inputFrase = document.getElementById('input-frase');
const btnFrase = document.getElementById('btn-frase');
const spotFrases = document.getElementById('spot-frases');

function limpiarFrases() {
    let spots = spotFrases.childNodes;
    for (let spot of spots) {
        spot.textContent = '';
    }
}
const mostrarModificaciones = () => {
    limpiarFrases();
    let str = inputFrase.value;
    let letra = crearParrafo();
    letra.textContent = letras(str) + ' letras';
    let palabra = crearParrafo()
    palabra.textContent = palabras(str) + ' palabras';
    let mays = crearParrafo();
    mays.textContent = maysc(str);
    let titul = crearParrafo();
    titul.textContent = titulo(str);
    let letrasReve = crearParrafo();
    letrasReve.textContent = letrasReves(str);
    let palabrasReve = crearParrafo();
    palabrasReve.textContent = palabrasReves(str);
    let palindrom = crearParrafo();
    palindrom.textContent = palindromo(str) ? 'Es palindromo' : 'No es palindromo';
    let array = [letra, palabra, mays, titul, letrasReve, palabrasReve, palindrom];
    array.forEach(el => spotFrases.append(el));



};

btnFrase.addEventListener('click', mostrarModificaciones);