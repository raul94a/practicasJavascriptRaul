//almacen
import {Product} from './product.js';

class Store{
    products = [];
    constructor(id){
        this.id = id;
    }
    findProduct(id){
        return this.products.filter((e)=>{
           if(e.id === id){
               return e;
           }
        })[0];
    }
    addProduct(id, nombre, precio){
        let producto = this.findProduct(id);
        //console.log(producto);
        if(producto){
            return false;
        }else{
            producto = new Product(id, nombre, precio);
            this.products.push(producto);
            return producto;
        }
    }
    delProduct(id){
        let index = this.products.findIndex(p =>{
            return p.id === id;
        });
        if(index > -1){
            let producto = this.products[index];
            if(producto.units > 0) return false;
            this.products.splice(index,1);
            return producto;
        }
        return false;
      
    }
    changeProductUnits(id, units){
        let producto = this.products.filter((product) => product.id === id)[0];
        if(producto){
            let totalUnits = producto.units + units;
            if(totalUnits < 0){
                return false;
            }else{
                producto.units = totalUnits;
                return true;
            }
        }
        return false;
        
    }
    totalImport(){
        return this.products.reduce((anterior, actual) => 
           
            (anterior.units * anterior.price) + (actual.units * actual.price)
        );
       
    }
    underStock(units){
        return this.products.filter((product) => product.units < units);
    }
    orderByUnits(){
        return this.products.sort((a, b)=>{
            if(a.units > b.units){
                return 1
            }else if(a.units < b.units) return -1;
            else return 0;
        });
    }
    orderByName(){
        return this.products.sort((a, b) => {
            if(a.name > b.name) return 1
            else if (a.name < b.name) return -1;
            else return 0;
        }); 
    }
}
//SI SE EJECUTA CON EL NODE ES MUCHO MEJOR!!!
let almacen = new Store(1);

almacen.addProduct(1, 'TV Samsumg MP45', 345.95);
almacen.addProduct(2, 'Abaco de madera', 245.95);
almacen.addProduct(3, 'Impresora Epson LX-455', 45.95);
almacen.addProduct(4, 'USB Kingston 16GB', 5.95);

almacen.changeProductUnits(2, 12);
almacen.changeProductUnits(4, 40);
almacen.changeProductUnits(2, -9);

console.log(almacen);

console.log('DELETE PRODUCT 4 \n')
console.log(almacen.delProduct(4))
console.log('DELETE PRODUCT 1 \n')
console.log(almacen.delProduct(1));

console.log('ORDER BY NAME\n')
console.log(almacen.orderByName());
console.log('ORDER BY UNITS\n')
console.log(almacen.orderByUnits());
console.log('UNDERSTOCK\n')
console.log(almacen.underStock(10))