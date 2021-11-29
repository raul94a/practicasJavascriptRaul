import {Product} from '../model/Product.js';
class View{
    tbody = document.querySelector('tbody');
    createTr(){
        return document.createElement('tr');
    }
    createTd(){
        return document.createElement('td');
    }
    renderIcons(tr){
        //fa-plus-circle fa-minus fa-trash-alt
        let icons = this.createTd();
        let actions = document.createElement('div');
        actions.classList.add('actions');

        let icon = document.createElement('i');
        icon.classList.add('fas','fa-plus-circle');
        actions.append(icon);

        icon = document.createElement('i');
        icon.classList.add('fas', 'fa-minus');
        actions.append(icon);

        icon = document.createElement('i');
        icon.classList.add('far', 'fa-trash-alt');
        actions.append(icon);

        icons.append(actions);
        tr.append(icons);
    }
    renderNewProduct(product){
        let tr = this.createTr();
        for(let p in product.toObject()){
            let td = this.createTd();
            if(p == 'id')
            tr.setAttribute('data-id',  product.toObject()[p])
            else if(p == 'name') tr.setAttribute('data-name', product.toObject()[p])
            else if(p == 'units') tr.setAttribute('data-units', product.toObject()[p])
            
            td.textContent = p == 'price' ? product.toObject()[p] + ' €': product.toObject()[p];
            tr.append(td);
        }
        let td = this.createTd();
        td.textContent = product.productImport().toFixed(2) + ' €';
        tr.append(td);
        this.renderIcons(tr);
        this.tbody.append(tr);
    }
    renderTable(store){
        store.products.forEach(product => this.renderNewProduct(product));
    }
    renderDelProduct(id){
        const array = Array.from(this.tbody.querySelectorAll('tr'));
        for(let tr of array){
            if(parseInt(tr.getAttribute('data-id')) == id){
                tr.remove();
                break;
            }
        }
    }
    renderStockProduct(id, units){
        const array = Array.from(this.tbody.querySelectorAll('tr'));
        for(let tr of array){
            if(parseInt(tr.getAttribute('data-id')) == id){
                let priceRow = tr.children[2];
                let unitsRow = tr.children[3];
                let totalPriceRow = tr.children[4];
                let price = parseFloat(priceRow.textContent);
                let previousUnits = parseInt(unitsRow.textContent);
                unitsRow.textContent = previousUnits + units;
                totalPriceRow.textContent = `${(price * parseInt(unitsRow.textContent)).toFixed(2)} €`;
            }
        }
    }

    renderMessage(message, error){
        let messageContainer = document.querySelector('.warning-container p');
        // borrar contenido anterior
        messageContainer.innerHTML = '';
        //colorear error
        if(error) messageContainer.classList.add('error');
        else messageContainer.classList.remove('error');
        messageContainer.textContent = message;

    }
}

export {View};