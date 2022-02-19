/**
 * Conexión y relación entre dos API
 * 
 * 
 * 
 */



export class BookFromGoogle {
    constructor(map){
        this.selfLink = map['selfLink']
        this.volumeInfo = new VolumeInfoFromMap(map['volumeInfo'])
        this.accessInfo = new AccessInfoFromMap(map['accessInfo'])
        this.saleInfo = new saleInfoFromMap(map['saleInfo'])
        console.log(this.volumeInfo, this.accessInfo)
    }
    /**
     * Permite añadir la información que guardo en Firebase acerca de cada libro a la info que proporciona la API de Google
     * 
     * @param {*} book 
     */
    addFirebaseData(book){
        this.read = book.read
        this.addedDate = book.addedDate
        this.readDate = book.readDate
        this.firebaseId = book.firebaseId
        this.rating = book.rating;
    }
    changeReadStatus(){
        this.read = !this.read
    }
}
class VolumeInfoFromMap {
    constructor(map){
        this.authors = map['authors']
        this.imageLinks = map['imageLinks']
        this.industryIdentifiers = map['industryIdentifiers']
        this.language = map['language']
        this.publisher = map['publisher']
        this.title = map['title']
        this.averageRating = map['averageRating']
        this.ratingsCount = map['ratingsCount']
        this.categories = map['categories']
        this.description = map['description'];
        this.publishedDate = map['publishedDate']
        this.pageCount = map['pageCount']
    }
    
}

class AccessInfoFromMap {
    constructor(map){
        this.embeddable = map['embeddable']
        this.webReaderLink = map['webReaderLink']
        this.pdf = map['pdf'];
        this.epub = map['epub'];
    }
}

class saleInfoFromMap{
    constructor(map){
        this.saleability = map['saleability']
        this.buyLink = map['buyLink']
    }
}

export default BookFromGoogle