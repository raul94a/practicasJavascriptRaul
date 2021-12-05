import { Controller } from "../../controller/Controller.js";


let controlador = new Controller();
// await controlador.getGoogleBooksFromFirebase()
// console.log(controlador.booksFromGoogle)
// controlador.searchBook('camino de los reyes')

const $ = selector => document.querySelector(selector);

const searchButton = $('#btnBuscar');
const searchInput = $('#input-busqueda');
const searchContainer = $('.contenedor-busqueda');
const backdrop = $('.backdrop');



backdrop.addEventListener('click', function () {
    backdrop.classList.toggle('ocultar')
    $('.extra-info-card-move').classList.toggle('ocultar');
    $('.extra-info-card-move').classList.toggle('extra-info-card-move');

})

searchButton.addEventListener('click', async function () {
    let searchValue = searchInput.value;

    let booksFromGoogle = await controlador.searchBook(searchValue);
    console.log(booksFromGoogle);
});


searchContainer.addEventListener('click', function (e) {
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

        // let backdrop =   $('.backdrop');
        // const toggleBackdrop = (e) => {
        //     extraCardInfo.classList.toggle('ocultar')
        //     
        //     backdrop.classList.toggle('ocultar')
        // }
        // toggleBackdrop(e);

        //  backdrop.addEventListener('click', toggleBackdrop);

    } else if (classList.contains('btn-firebase')) {
        const selfLink = target.getAttribute('data-selfLink');
        controlador.postBookToFirebase(selfLink);
        let extraCardInfo = target.parentElement
        let p = view.createParagraph();
        p.style.color = 'green';
        p.textContent = 'Guardando libros en pendientes...'
        extraCardInfo.append(p);
        //QUEREMOS DESHABILITAR EL BOTON DE ENVIAR Y CERRAR EL CARD
        //NECESITAMOS EL extrainfocard...


        //Un debounce...
        target.disabled = true;

        setTimeout(()=>{
            setTimeout(()=>{
                view.toggleBackdrop()
                view.toggleExtraInfoCard(false,extraCardInfo);
                target.remove();
                
                p.textContent = 'El libro ya ha sido añadido a lista de pendinetes'

            },1000)
            p.textContent = 'LISTO!'
        }, 2000)
    }
});