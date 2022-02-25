//clase de inserción y retirada de datos en FIREBASE!
class FirebaseBook {
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
    /**
     * El Object devuelto por la petición al endpoint de libros de Firebase es utilizado para generar
     * la instancia de Book, al que se añadirá la propiedad firebaseId, que contiene el identificador único
     * del libro en el endpoint de firebase
     * @param {Object} map 
     * @param {string} firebaseId 
     * @returns 
     */
    static createBookFromFirebase(map, firebaseId){
        // console.log(map)
        // console.log(map['addedDate'])
        
        let book = new FirebaseBook(map['selfLink'], map['addedDate'], map['readDate'], map['read'], map['rating']);
        book.firebaseId = firebaseId;
        // console.log(this)
        return book;
    }
}

export default FirebaseBook