//almacen
class Product{
    constructor(id, name, price, units = 0){
        this.id = id;
        this.name = name;
        this.price = price;
        this.units = units;
    }
    changeUnits(units){
        if(this.units + units < 0){
            return false;
        } 
        this.units += units;
    }
    productImport(){
        return this.price * this.units;
    }
    toString(){
        return `${this.name} (${this.units}): ${parseFloat(this.price.toFixed(2))} €/u => ${parseFloat(this.productImport().toFixed(2))} €`;
    }
}

class Store{
    products = [p,p1];
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
        console.log(producto);
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
            this.products.splice(index,1);
            return true;
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

    
}

let p = new Product(1, 'Xiaomi Redmi Note 9', 250.98, 50);

let p1 = new Product(2, 'Xiaomi Redmi Note 9', 250.98, 10);
let store = new Store(1);


