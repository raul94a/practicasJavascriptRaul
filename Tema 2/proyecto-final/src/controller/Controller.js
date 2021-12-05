
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

    async searchBook(book){
        //Por ahora vamos a hacer una búsquda básica
        let resultSet = await HttpRequest.httpGet(false, book);
        console.log(resultSet)
        let booksFromGoogle = [];
        for(let result of resultSet['items']){
            booksFromGoogle.push(new BookFromGoogle(result))
        }
        this.view.renderSearch(booksFromGoogle)
        return booksFromGoogle;
    }

    /**
     * Hace un request a firebase para traerse todos los libros pendientes/leidos
     * itera sobre el mapa recibido, creando un objeto de tipo BookFromGoogle a partir del Book generado con estos datos
     * booksFromGoogle queda seteada con objetos de tipo BookFromGoogle, que contiene tanto datos de Google Books como de Firebase
     * @returns Array
     */

    async getGoogleBooksFromFirebase() {
        //embebemos la función de petición de libro específico en ESTA función por temas de seguridad
        /**
         * 
         * @param {Book} book => recibe un libro de clase Book, que es creado a partir de datos de Firebase 
         * @returns {BookFromGoogle} devuelve un objeto BookFromGoogle con los datos añadidos de firebase
         */

        const getBook = async (book) => {
            let bookFromGoogle = new BookFromGoogle(await HttpRequest.httpGetBook(book.selfLink));
            bookFromGoogle.addFirebaseData(book);
            return bookFromGoogle;
        }

        //petición a firebase
        let items = await HttpRequest.httpGet(true);
        let booksFromGoogle = [];
        for (let i in items) {
            //petición a Google Books
            booksFromGoogle.push(
                //hacemos la peticion a la api de google de cada libro que extraigamos de nuestro firebase
                await
                    getBook(
                        Book.createBookFromFirebase(items[i], i)
                    )
            );
        }
        this.booksFromGoogle = booksFromGoogle;
        return this.booksFromGoogle;
    }

    /**
     * Recibe una variable de tipo Book que será utilizada para realizar un post a firebase
     * Recordemos que book puede crearse a partir de la propiedad selfLink de BookFromGoogle
     * @param {Book} book 
     */
    async postBookToFirebase(selfLink) {
        const book = new Book(selfLink);
        await HttpRequest.postToFirebase(book);
        //en el futuro puedo añadir que el Book se añada a la lista de Book
        //objetivo => reducir las peticiones HTTP
    }

}