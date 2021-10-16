function letras(str){
    return str.length;
}
function palabras(str){
    return str.split(' ').length;
}

function maysc(str){
   
    return str.toUpperCase();
}

function titulo(str){
    let array = str.split(' ');
    let strModificada = "";
    array.forEach(element => strModificada += element[0].toUpperCase() + element.substring(1) + " ");
    return strModificada.substring(0, strModificada.length - 1);
}

function letrasReves(str){
    let strModificada = '';
    for(let i = str.length - 1 ; i >= 0;i--){
       
        strModificada += str[i];
    }
    return strModificada;
}

function palabrasReves(str){
    let array = str.split(' ');
    let strModificada = '';
    for(let a of array){
        strModificada = a + " " + strModificada;
    }
    return strModificada;
}

function palindromo(str){
    str = str.split(' ').join('').toLowerCase();
    return letrasReves(str) === str;
}