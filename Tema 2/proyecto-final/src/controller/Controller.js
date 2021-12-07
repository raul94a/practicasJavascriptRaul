
import { HttpRequest } from "../services/HttpRequest.js";
import { Book } from "../models/Book.js";
import { BookFromGoogle } from "../models/BookFromGoogle.js";
import { View } from "../views/View.js";


export class Controller {
    booksFromFirebase = [];
    booksFromGoogle = [];
    view = new View();

    /**
     * Devuelve 10 resultados...
     * @param {String} book 
     * @returns Array{BookFromGoogle}
     */

    async searchBook(book) {
        //Por ahora vamos a hacer una búsquda básica
        let resultSet = await HttpRequest.httpGet(false, book);
        console.log(resultSet)
        let booksFromGoogle = [];
        for (let result of resultSet['items']) {
            booksFromGoogle.push(new BookFromGoogle(result))
        }
        this.view.renderBooks(booksFromGoogle)
        return booksFromGoogle;
    }

    /**
     * Hace un request a firebase para traerse todos los libros pendientes/leidos
     * itera sobre el mapa recibido, creando un objeto de tipo BookFromGoogle a partir del Book generado con estos datos
     * booksFromGoogle queda seteada con objetos de tipo BookFromGoogle, que contiene tanto datos de Google Books como de Firebase
     * @returns Array
     */
     async getBook(book) {
        let bookFromGoogle = new BookFromGoogle(await HttpRequest.httpGetBook(book.selfLink));
        bookFromGoogle.addFirebaseData(book);
        return bookFromGoogle;
    }

    async getGoogleBooksFromFirebase() {
        //embebemos la función de petición de libro específico en ESTA función por temas de seguridad
        /**
         * 
         * @param {Book} book => recibe un libro de clase Book, que es creado a partir de datos de Firebase 
         * @returns {BookFromGoogle} devuelve un objeto BookFromGoogle con los datos añadidos de firebase
         */
        //petición a firebase
        let items = await HttpRequest.httpGet(true);
        console.log(items);
        let booksFromGoogle = [];
        for (let i in items) {
            //petición a Google Books
            booksFromGoogle.push(
                //hacemos la peticion a la api de google de cada libro que extraigamos de nuestro firebase
                await this.getBook(
                    Book.createBookFromFirebase(items[i], i)
                )
            );
        }
        this.booksFromGoogle = booksFromGoogle;
        //ESTE FILTRADO HAY QUE SACARLO AUNA FUNCIÓN EXTERNA PARA FILTRAR AL PULSASR SOBER LEIDOS O NO LEIDOS
        // const filteredBooksFromGoogle = this.booksFromGoogle.filter(book => isRead ? book.read : !book.read );
        //AQUI NO RENDERIZAREMOS EN EL FUTURO, SI NO AL PULSAR SOBE LEIDOS, NO LEIDOS O EL BOTÓN DE BÚSQUEDA,
        //es decir, en el futuro al pinchar sobre estos dos primero sbotones no se realiza la petición http, si no que se utilizan los datos en memoria
        //los datos son cargados al cargar la página
        // this.view.renderSearch2(filteredBooksFromGoogle, isSearched);
        return this.booksFromGoogle;
    }
    filterBooksByReadStatus(isRead) {
        return this.booksFromGoogle.filter(book => isRead ? book.read : !book.read)
    }

    /**
     * Recibe una variable de tipo String que será utilizada para realizar un post a firebase
     * Recordemos que book puede crearse a partir de la propiedad selfLink de BookFromGoogle
     * @param {String} selfLink 
     */
    async postBookToFirebase(selfLink) {
        const book = new Book(selfLink);
        await HttpRequest.postToFirebase(book);
        let bookFromGoogle = await this.getBook(book);
        //AÑADIMOS
        this.booksFromGoogle.push(bookFromGoogle);
        //RENDEREIZAMOS
        this.view.renderStoredBook(bookFromGoogle);
        //en el futuro puedo añadir que el Book se añada a la lista de Book
        //objetivo => reducir las peticiones HTTP
    }
    async changeReadStatus(firebaseId, isRead) {
        //DEBEMOS CAMBIAR EL STATUS TB EN EL ARRAY DE BOOKSFROMGOOGLE
        let read = isRead ? false : true;
        // console.log(this.booksFromGoogle)
        let book  = this.booksFromGoogle.filter(el => el.firebaseId === firebaseId)[0]
        console.log(book)
        book.read = read;
        // console.log(this.booksFromFirebase);
        await HttpRequest.changeReadStatus(firebaseId, isRead);
        await HttpRequest.setReadingDate(firebaseId, read)
        //AQUÍ HABRÁI QUE RENDERIZAR
        this.view.renderStoredBook(book, read)
        
    }
    async init(){
        //cargamos la data
        await this.getGoogleBooksFromFirebase();
        //cargamos los libros leidos y pendientes
        this.view.renderBooks(this.filterBooksByReadStatus(false), false);
        this.view.renderBooks(this.filterBooksByReadStatus(true), false, true);
    }


}