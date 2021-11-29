import { Controller } from './controller/Controller.js';
import { Product } from './model/product.js';
const $ = (selector) => document.querySelector(selector);
const $$ = (id) => document.getElementById(id);

const barraLateral = $('.barra-lateral');
const backdrop = $('.backdrop');
const formularios = $('.formularios')
const enviarAddNewProduct = $('.formularios .newproduct .form-controls button[type="submit"]');
const enviarDelProduct = $('.formularios .delproduct .form-controls button[type="submit"]')
const enviarStockProduct = $('.formularios .stockproduct .form-controls button[type="submit"]');
const enviarOrdenacionTabla = $('#control-ordenacion');
const enviarMostrarPorUnidades = $('#mostrar-por-unidades');
//fa-plus-circle fa-minus fa-trash-alt
const tbody = $('tbody');


tbody.addEventListener('click', function (e) {
    const target = e.target;
    const classList = target.classList
    if (classList.contains('fa-plus-circle') ||
        classList.contains('fa-minus') ||
        classList.contains('fa-trash-alt')) {
        //Si es alguno de los botonos...
        let id = target.closest('tr').getAttribute('data-id');
        let leftUnits = almacen.findProduct(parseInt(id)).units;
        if (classList.contains('fa-plus-circle')) {
            if (leftUnits === 0) {
                target.nextElementSibling.classList.remove('hideIcon');
            }
            Controller.changeProductStore({ "id": parseInt(id), "units": 1 });

        } else if (classList.contains('fa-minus')) {
            Controller.changeProductStore({ "id": parseInt(id), "units": -1 });
            if (leftUnits === 1) {
                console.log(leftUnits)
                console.log(target)
                target.classList.add('hideIcon');
            }
        }
        else if (classList.contains('fa-trash-alt')) {
            Controller.deleteProductFromStore(parseInt(id));
        }
        //   console.log(this.closest())
    }
});
const messageContainer = $('.warning-message p');


const closeModalHandler = (event) => {
    const target = event.target;
    if (target.classList.contains('btnCerrar')) {
        target.parentElement.classList.toggle('oculto');
        //this.parentElement.toggle('oculto');
        backdrop.classList.toggle('oculto');
        return;
    }
    return;
}
const toggleFormAndBackDrop = element => {
    element.classList.toggle('oculto');
    backdrop.classList.toggle('oculto');
};
const iconFormTriggerHandler = (event) => {
    const map = { "add": "newproduct", "del": "delproduct", "stock": "stockproduct" };
    const target = event.target;

    const existsClassList = () => {
        const keys = Object.keys(map);
        return Array.from(target.parentElement.classList).some(c => keys.includes(c));
    }

    if (existsClassList()) {
        //seleccionamos el formulario que tiene que aparecer
        const form = document.querySelector(`.${map[Array.from(target.parentElement.classList)[1]]}`);

        //le quitamos la clase oculto
        const divForm = form.parentElement;
        toggleFormAndBackDrop(divForm)
    }

};

const addNewProductHandler = (e) => {
    e.preventDefault();

    const nombre = document.getElementById('newproduct-nombre');
    const precio = document.getElementById('newproduct-precio');
    const nombreVal = nombre.value;
    const precioVal = precio.value;

    if (nombreVal == '' || precioVal == '') {
        Controller.view.renderMessage("Error. Alguno de los campos está vacío", true);
        return;
    }

    const product = Controller.addProductToStore({ "nombre": nombreVal, "precio": parseFloat(precioVal) });
    toggleFormAndBackDrop(document.querySelector('.formularios .newproduct').parentElement);

}

const delProductHandler = (e) => {
    e.preventDefault();
    const id = document.getElementById('delproduct-id');
    let idVal = id.value;
    if (id == '') {
        Controller.renderMessage('Error. El identificador introducido no existe.', true);
        return;
    }
    Controller.deleteProductFromStore(parseInt(idVal));
    toggleFormAndBackDrop(document.querySelector('.formularios .delproduct').parentElement);
}

const stockProductHandler = e => {
    e.preventDefault();
    console.log('clicked')
    const id = document.getElementById('stockproduct-id');
    const units = document.getElementById('stockproduct-units');
    let idVal = parseInt(id.value);
    let unitsVal = parseInt(units.value);
    //
    if (id.value === '' || units.value === '') return;
    let obj = { "id": idVal, "units": unitsVal };
    Controller.changeProductStore(obj);
    toggleFormAndBackDrop(document.querySelector('.formularios .stockproduct').parentElement);

};

const orderTableHandler = (e) => {
    e.preventDefault();
   
    const selectedOption = document.querySelector('#form-ordenar select').selectedIndex;
    
    if (selectedOption != 0)
        $('tbody').innerHTML = '';

    if (selectedOption == 1) {
        //trigger alphabetically order
        let products = Controller.store.orderByName();
        //Render products into table
        products.forEach(product => Controller.view.renderNewProduct(product));

    } else if (selectedOption == 2) {
        // [...$('tbody').children].sort((a,b) => {
        //     if(a.getAttribute('data-units') > b.getAttribute('data-units')) return 1;
        //     else if(a.getAttribute('data-units') > b.getAttribute('data-units')) return -1;
        //     else return 0;
        // });
        Controller.store.orderByUnits().forEach(product => Controller.view.renderNewProduct(product));
    }
};

const filterByUnits = (e) => {
    e.preventDefault();
    const inputUnits = $('#mostrar-por-unidades');
    const inputUnitsValue = parseInt(inputUnits.value);
    $('tbody').innerHTML = '';
    //ERROR MENSAJE
    if (inputUnits.value === '') {
        Controller.view.renderTable(Controller.store);
    }
    Controller.store.underStock(inputUnitsValue).forEach(product => Controller.view.renderNewProduct(product));

}


const almacen = Controller.store;
for (let p of almacen.products) {
    Controller.view.renderNewProduct(p);

}

barraLateral.addEventListener('click', iconFormTriggerHandler);
formularios.addEventListener('click', closeModalHandler);
enviarAddNewProduct.addEventListener('click', addNewProductHandler);
enviarDelProduct.addEventListener('click', delProductHandler);
enviarStockProduct.addEventListener('click', stockProductHandler);
enviarOrdenacionTabla.addEventListener('change', orderTableHandler);
enviarMostrarPorUnidades.addEventListener('keyup', filterByUnits);