import { Controller } from "../../controller/Controller.js";

/**
 * TODO 
 * 1. Pinta la información correctamente dentro de los extraCardInfo
 *  Búsqueda => FECHA DE PUBLICACIÓN, MINIATURA (METER EN DIV Y FLOATEARLO A LA DERECHA)
 * 
 * 2. BOTONES DE OPCIONES DE LECTURA Y DESCARGA EN EL CASO DE QUE ESTÉ DISPONIBLE
 * 
 * 3. ¿MODAL DE RATING DE LIBRO?
 * 
 */

let controlador = new Controller();
//cargamos los datos!
// await controlador.init()


const $ = selector => document.querySelector(selector);

const searchButton = $('#btnBuscar');
const searchInput = $('#input-busqueda');
const searchContainer = $('.contenedor-principal');
const backdrop = $('.backdrop');
const nav = $('nav');

const selectContainer = (target) => {
    let children = $('.contenedor-principal').children;
    let array = Array.from(children).slice(1);
    console.log(array)
    //algoritmo de control de estado de contenedor -> encontrar el que se ha pinchado
    /*
    Si está activo y hemos pinchado en el lo dejamos como está...
    Si esta´inactivo y hemos pinchado sobre él tenemos que buscar el activo y apagarlo. Encender el pinchado
    */
    //para saber a donde dirigirnos en el caso de pulsar un boton
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

nav.addEventListener('click', async function (e) {
    const target = e.target;
    selectContainer(target);
});


backdrop.addEventListener('click', function () {
    backdrop.classList.toggle('ocultar')
    $('.extra-info-card-move').classList.toggle('ocultar');
    $('.extra-info-card-move').classList.toggle('extra-info-card-move');

})

searchButton.addEventListener('click', async function () {
    let searchValue = searchInput.value;
    await controlador.searchBook(searchValue);
    // console.log(booksFromGoogle);
});

searchContainer.addEventListener('click', async function (e) {
    // console.log(e, e.srcElement.localName)

    const target = e.target;
    const tagName = e.srcElement.localName
    const classList = target.classList;
    const tagList = ['p', 'img']
    // console.log(target, classList)
    let view = controlador.view;
    if (classList.contains('book-card') || tagList.includes(tagName)) {
        //hacer aparecer al elemento
        let extraCardInfo = target.closest('.book-card').nextElementSibling;
        //console.log(extraCardInfo)
        view.toggleBackdrop();
        view.toggleExtraInfoCard(false, extraCardInfo);

    } else if (classList.contains('btn-firebase')) {
        const selfLink = target.getAttribute('data-selfLink');
        await controlador.postBookToFirebase(selfLink);
        let extraCardInfo = target.parentElement
        let p = view.createParagraph();
        p.style.color = 'white';
        p.textContent = 'Guardando libros en pendientes...'
        extraCardInfo.append(p);
        //QUEREMOS DESHABILITAR EL BOTON DE ENVIAR Y CERRAR EL CARD
        //NECESITAMOS EL extrainfocard...
        //Un debounce...
        target.disabled = true;
        setTimeout(() => {
            setTimeout(() => {
                view.toggleBackdrop()
                view.toggleExtraInfoCard(false, extraCardInfo);
                target.remove();
                p.textContent = 'El libro ya ha sido añadido a lista de pendientes'
            }, 1000)
            p.textContent = 'LISTO!'
        }, 2000);

        //AÑADIR EL LIBRO A PENDIENTES1!!!!!!!
    } else if (classList.contains('btnReadBook')) {
        let firebaseId = target.getAttribute('data-firebase');
        target.disabled = true;
        await controlador.changeReadStatus(firebaseId, false)
        target.closest('.contenedor-book-card').remove();
        view.toggleBackdrop();
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
