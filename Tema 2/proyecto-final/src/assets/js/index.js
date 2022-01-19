import { Controller } from "../../controller/Controller.js";


/**
 * selecciona un elemento del dom pasandole el selector
 * @param {string} selector 
 * @returns 
 */

const $ = selector => document.querySelector(selector);
//instanciamos el controlador
let controlador = new Controller();
//cargamos los datos!
let body = document.querySelector('body');
let div = document.createElement('div');
setTimeout(async () => {
    div.textContent = 'BooksApp - Encuentra el libro que quieras'
    div.classList.add('tracking-in-expand');
    let p = controlador.view.createParagraph();
   
    p.textContent = 'Cargando';
    p.style.color = 'white';
    div.append(p);
   
    body.children[1].after(div);
    
    
    setTimeout(async () => {
        await controlador.init()
        div.remove()
    }, 1000);

    
}, 1000);



const searchButton = $('#btnBuscar');
const searchInput = $('#input-busqueda');
const searchContainer = $('.contenedor-principal');
const busqueda = $('.busqueda');
const backdrop = $('.backdrop');
const nav = $('nav');

/**
 * Los tres primeros parámetros son los mensajes que aparecen en orden tras ejecutar la función
 * extraCardInfo es el elemento del dom donde se recoge la información adicional del libro
 * target es el botón donde se ha realizado click
 * view es la instancia de la clase View. 
 * @param {string} paragraphText 
 * @param {string} firstMessage 
 * @param {string} secondMessage 
 * @param {HTMLElement} extraCardInfo 
 * @param {HTMLElement} target 
 * @param {View} view 
 * */


const delayApp = (paragraphText, firstMessage, secondMessage, extraCardInfo, target, view) => {
    let p = view.createParagraph();
    p.style.color = 'white';
    p.textContent = paragraphText
    extraCardInfo.append(p);
    setTimeout(() => {
        setTimeout(() => {
            view.toggleBackdrop()
            view.toggleExtraInfoCard(false, extraCardInfo);
            target.remove();
            p.textContent = firstMessage
        }, 1000)
        p.textContent = secondMessage
    }, 2000);
}

/**
 * algoritmo de control de estado de contenedor -> encontrar el que se ha pinchado
    Si está activo y hemos pinchado en el lo dejamos como está...
    Si esta´inactivo y hemos pinchado sobre él tenemos que buscar el activo y apagarlo. Encender el pinchado
    para saber a donde dirigirnos en el caso de pulsar un boton
 * @param {HTMElement} target 
 */
const selectContainer = (target) => {
    let children = $('.contenedor-principal').children;
    let array = Array.from(children).slice(1);
    console.log(array)

    const map = { "leidos": "contenedor-leidos", "pendientes": "contenedor-pendientes", "busqueda": "busqueda" };
    //seleccionamos la classList del elemento que NO está oculto...
    let activeClass = array.filter(el => !el.classList.contains('ocultar'))[0].classList[0]
    const element = array.filter(el => el.classList.contains(map[target.id]))[0]
    if (element.classList.contains('ocultar')) {
        let selectedElement = $('.' + map[target.id])
        selectedElement.classList.toggle('ocultar');
        $(`.${activeClass}`).classList.toggle('ocultar')
    }
}
/**
 * Permite cambiar de vista al pulsar un boton
 */
nav.addEventListener('click', async function (e) {
    const target = e.target;
    selectContainer(target);
});

/**
 * Ocultamos / Hacemos aparecer el backdrop y el card de info extra del libro al hacer click sobre el backdrop
 */
backdrop.addEventListener('click', function () {
    backdrop.classList.toggle('ocultar')
    $('.extra-info-card-move').classList.toggle('ocultar');
    $('.extra-info-card-move').classList.toggle('extra-info-card-move');

})
/**
 * Evento de búsqueda de elementos
 */
searchButton.addEventListener('click', async function () {
    let searchValue = searchInput.value;
    await controlador.searchBookWithPagination(searchValue);//searchBook(searchValue);
    // console.log(booksFromGoogle);
});

/**
 * Control de paginación, permite cambiar de página
 */
busqueda.addEventListener('click', function (e) {
    const target = e.target;
    // console.log(target);
    if (target.parentElement.classList.contains('pagination-control')) {
        //alert(target.textContent);
        //console.log(target.textContent)
        let page = parseInt(target.textContent);
        //console.log(page);
        controlador.view.renderSearchedBooksWithPagination(controlador.searchedBooks, page * 10, controlador.booksFromGoogle);
    }
});

//NO DEBERIA LLAMARSE ASÍ
/**
 * La funcionalidad se debe separar
 */
searchContainer.addEventListener('click', async function (e) {
    // console.log(e, e.srcElement.localName)

    const target = e.target;
    const tagName = e.srcElement.localName
    const classList = target.classList;
    const tagList = ['p', 'img']
    // console.log(target, classList)
    let view = controlador.view;
    //Permite controlar la aparición del card extra info
    if (classList.contains('book-card') || tagList.includes(tagName)) {
        //hacer aparecer al elemento
        let extraCardInfo = target.closest('.book-card').nextElementSibling;
        //console.log(extraCardInfo)
        view.toggleBackdrop();
        view.toggleExtraInfoCard(false, extraCardInfo);
        //controla el post del libro que le ha gustado al usuario a FIREBASE
    } else if (classList.contains('btn-firebase')) {
        const selfLink = target.getAttribute('data-selfLink');
        await controlador.postBookToFirebase(selfLink);
        let extraCardInfo = target.closest('.extra-info-card-move')
        delayApp('Guardando libros en pendientes...', 'El libro ya ha sido añadido a la lista de pendientes', 'LISTO!', extraCardInfo, target, view)

        //Pasar el libro a LEIDOS
    } else if (classList.contains('btnReadBook')) {
        let firebaseId = target.getAttribute('data-firebase');
        target.disabled = true;
        await controlador.changeReadStatus(firebaseId, false)
        target.closest('.contenedor-book-card').remove();
        view.toggleBackdrop();
        //Pasar el libro a NO LEIDOS ---- hay redundancia se puede refactorizar
    } else if (classList.contains('btnReadBook-remove')) {
        let firebaseId = target.getAttribute('data-firebase');
        target.disabled = true;
        let div = view.createDiv();
        div.style.width = '300px';
        div.style.height = '300px';
        div.style.margin = '0 auto';
        div.style.position = 'absolute';
        div.style.zIndex = '1000';
        this.append(div)
        let p = view.createParagraph()
        div.append(p)

        setTimeout(() => {
            p.textContent = 'Eliminando de la lista de libros leídos...'
            target.closest('.contenedor-book-card').remove();
            setTimeout(() => {
                p.textContent = 'Hecho :)'
                view.toggleBackdrop();
            }, 1000)
        }, 1000)


        await controlador.changeReadStatus(firebaseId, true);
        div.remove();

    }
});
