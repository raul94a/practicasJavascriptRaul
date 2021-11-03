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
export  {Product};