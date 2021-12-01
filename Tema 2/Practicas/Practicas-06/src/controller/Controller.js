import { Product } from '../model/product.js';
import {Store, almacen} from '../model/Store.js';
import {View} from '../view/view.js';

export class Controller{
    static store = almacen;
    static view = new View();
    static addStore(id){
        if(this.store.filter(e => e.id === parseInt(id))){
            return;
        }
        this.stores.push(new Store(parseInt(id)));
    }
    static printStore(){
        console.log(this.stores);
    }
    //segundo parametro es un objeto con los datos del producto
    static addProductToStore(newProdData){
        
        const generarId = (identificador = 0) =>{
            for(let p of this.store.products){
                if(p.id >= identificador){
                    identificador = p.id + 1;
                }
            }
            return identificador;
        }
        const identificador = generarId();
        const nombre = newProdData['nombre'];
        const precio = newProdData['precio'];
        const product = new Product(identificador, nombre, precio);
        this.store.addProduct(identificador, nombre, precio);
        Controller.view.renderNewProduct(product);
        Controller.view.renderMessage('Se ha añadido el producto ' + nombre + " al almacén.");

    }
    static deleteProductFromStore(id){
        let producto = this.store.products.filter(prod => prod.id == id)[0];
        console.log(producto);
        if(producto){
            let confirmacion = prompt(`¿De verdad quieres borrar el producto ${producto.nombre} con identificador ${id}?`);
            if(confirmacion.toLowerCase() == 'si'){
                if(producto.units > 0){
                    let segundaConf = prompt('Aun hay unidades de este producto en el almacén. ¿BORRAR? si/no')
                    if(segundaConf.toLowerCase() == 'si'){
                        this.store.delProduct(id);
                        this.view.renderDelProduct(id);
                        this.view.renderMessage('El artículo con ID 1 ha sido borrado');

                    }
                    return;
                }
                this.store.delProduct(id);
                this.view.renderDelProduct(id);
                this.view.renderMessage('El artículo con ID 1 ha sido borrado');

                return;
            }
            // this.view.renderDelProduct(id);
           this.view.renderMessage('El artículo con ID 1 ha sido borrado');
            return;
        }
        this.view.renderMessage('Error. El identificador introducido no existe.', true);
        //RENDERIZAR MENSAJE DE ERROR
        return;

    }
    //segundo paraemtro es un objeto con la id y las unidades
    static changeProductStore(changeStockDataObject){
        const id = changeStockDataObject["id"];
        const units = changeStockDataObject["units"];
        if(this.store.changeProductUnits(id, units)){
            this.view.renderStockProduct(id, units);
           this.view.renderMessage(`Se han añadido ${units} unidades al producto con identificador ${id}`);
            return;
        }
       this.view.renderMessage('Error. El identificador introducido no existe o se han intentado retirar más unidades de las disponibles.', true);
        //necesitamos renderizar los resultados!
    }
    //se le pasa los datos al producto y la fila donde se encuentra para que sea modificada
    static changeProductInStore(dataProductObject, tr){
        //modificar el producto en nuestro almacén
        let producto = this.store.findProduct(parseInt(dataProductObject['id']));
        producto.name = dataProductObject['name'];
        producto.price = dataProductObject['price'];
        
        //modificar la tabla en el DOM
        this.view.renderModifyProduct(producto, tr);
        
        
    }
}

