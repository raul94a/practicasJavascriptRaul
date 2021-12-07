//clase de inserción y retirada de datos en FIREBASE!
export class Book {
    //cuando insertemos no será necesaria la firebase ID, pero al seleccionar si debemos de meterle la FIREBASEID de forma dinámica!
    constructor(
        selfLink,
        
        addedDate = new Date().toLocaleString('es-ES', { day: "numeric", month: '2-digit', year: 'numeric' }),
        readDate = '',
        read = false,
        rating = null
    ) {
        this.selfLink = selfLink
        this.addedDate = addedDate
        this.readDate = readDate
        this.read = read
        this.rating = rating
    }

    static createBookFromFirebase(map, firebaseId){
        // console.log(map)
        // console.log(map['addedDate'])
        let book = new Book(map['selfLink'], map['addedDate'], map['readDate'], map['read'], map['rating']);
        book.firebaseId = firebaseId;
        
        return book;
    }
}

