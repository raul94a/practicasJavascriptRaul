const btnEj1 = document.getElementById('btnEj1');
const inputEj1 = document.getElementById('inputEj1');
const article = document.querySelector('#resultEj1');
function limpiarArticleEj1(){
    article.innerHTML = '';
}

btnEj1.addEventListener('click', function(e){
    limpiarArticleEj1();
    let str = inputEj1.value;
    inputEj1.value = '';
    let array = str.split('');
    let object = {};
    array.forEach(element => {

        if(element !== ' '){
            if(!object[element]){
                object[element] = 1;
            }else{
                object[element] += 1;
            }
        }
        
    });

   
    for(let o in object){
        let parrafo = document.createElement('p');
        parrafo.textContent = `La letra ${o} se encuentra ${object[o]} ${object[o] == 1 ? 'vez':'veces'}`;
        article.append(parrafo);
    }
});

//ejercicio 2
const inicioEj2 = document.getElementById('inicioEj2');


function addElementsToArray(array, ...element){
    for(let a of element){
        array.push(a);
    }
}
function addElementsToHealedArray(array, ...element){
    for(let e of element){
        console.log(e);
        if(!isNaN(e) && (parseFloat(e) >= 0.0 && parseFloat(e) <= 10.0)){
            array.push(parseFloat(parseFloat(e.replace(' ', '')).toFixed(2)));
        }
    }
}
//
function primerSuspenso(array) {
    let min = Math.min(...array);
    return min < 5 ? min : 'No hay suspensos';
};
function getTotalAprobado(array){
    
    return getAprobados(array).length;
   
}
function getAprobados(array){
    return array.filter((e) => e >= 5);

}
function notaMedia(array){
    return parseFloat((array.reduce((a, c) => a + c) / array.length).toFixed(2)) ;
}

function notaFinal(array){
    return parseFloat(array.filter(e => parseFloat((e * 1.10).toFixed(1))));
}
function limpiarParrafoEj2(){
    articleEj2.innerHTML = '';
}


const articleEj2 = document.getElementById('articleEj2');

inicioEj2.addEventListener('click', function(e){
    limpiarParrafoEj2();
    let parar =  false;
    const array = [];
    const arrayCurado = [];
    do{
        let promp = prompt('Introduce la nota o notas separadas por comas');
       
        if(promp != null){
            let arr = promp.split(',');
            addElementsToArray(array, ...arr);
            addElementsToHealedArray(arrayCurado, ...arr);
              
            console.log(array);
            console.log('arraycurado', arrayCurado);

        }else{
            parar = true;
        }

    }while(!parar);
    
    let strArray = "Notas introducidas: " + array.join('  ');
    let strCurados = "Notas válidas: " + arrayCurado.join('  ');
    let primerSuspens = "Primer suspenso: " + primerSuspenso(arrayCurado);
    let aprobados = "Hay " + getTotalAprobado(arrayCurado) + " aprobados " + getAprobados(arrayCurado).join(' ');
    let media = "Nota media: " + notaMedia(arrayCurado);
    let finales = "Nota final: " + notaFinal(arrayCurado);

    const arrayStrings = [strArray, strCurados, primerSuspens, aprobados, media, finales];
    
    arrayStrings.forEach(e => {
        let parrafo = document.createElement('p');
        parrafo.textContent = e;
        articleEj2.append(parrafo);
    });


    
});