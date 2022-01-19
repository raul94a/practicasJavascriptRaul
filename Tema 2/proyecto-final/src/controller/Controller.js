
import { HttpRequest } from "../services/HttpRequest.js";
import { Book } from "../models/Book.js";
import { BookFromGoogle } from "../models/BookFromGoogle.js";
import { View } from "../views/View.js";


export class Controller {
    booksFromFirebase = [];
    booksFromGoogle = [];
    searchedBooks = [];
    view = new View();

    /**
     *  @deprecated la nueva función utilizada es searchBookWithPagination
     * Función necesaria para realizar búsquedas de libros en la API de Google
     * El argumento book no tiene por qué ser un libro, también podría ser un autor
     * El algoritmo de búsqueda de Google trabaja por nosotros
     * @param {String} book 
     * @returns Array{BookFromGoogle}
     */

    async searchBook(book) {
        //generamos el resultSet de la petición a la API de Google (40 items max)
        let resultSet = await HttpRequest.httpGet(false, book);

        console.log(resultSet)
        //guardamos cada resultado (instanciad e BookFromGoogle) en el Array declarado
        let booksFromGoogle = [];
        for (let result of resultSet['items']) {
            booksFromGoogle.push(new BookFromGoogle(result))
        }
        this.view.renderBooks(booksFromGoogle, true, false, this.booksFromGoogle);
        return booksFromGoogle;
    }
    /**
     * Busca el libro (o autor) en la API de Google
     * Renderiza el resultado obtenido
     * @param {string} book 
     */
    async searchBookWithPagination(book) {
        let busqueda = document.querySelector('.busqueda');
        this.searchedBooks = [];
        // console.log(busqueda.children.length)

        //eliminamos la barra de búsqueda en el caso de que exista
        if (busqueda.children.length !== 3) {
            document.querySelector('.pagination-control').remove();
        }
        //generamos el resultSet (40 items) tras pedir datos a la API de Google
        let resultSet = await HttpRequest.httpGet(false, book);
        for (let result of resultSet['items']) {
            this.searchedBooks.push(new BookFromGoogle(result));
        }
        //renderizamos el resultado de búsqueda
        this.view.renderSearchedBooksWithPagination(this.searchedBooks, 10, this.booksFromGoogle);
        //INTRODUCIMOS LOS BOTONES JUSTO DEBAJO DEL BUSCADOR
        document.querySelector('.control-busqueda').after(this.view.paginateSearch(this.searchedBooks));

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
        /**
         * 
         *Función que realiza la petición de todos los libros de firebase, devolviendo la lista de BookFromGoogle
         * Unicamente es llamada cuando la App se inicia
         * @returns {BookFromGoogle} devuelve un objeto BookFromGoogle con los datos añadidos de firebase
         */
        //petición a firebase
        let items = await HttpRequest.httpGet(true);
        console.log(items);
        let booksFromGoogle = [];
        //generamos nuestra lista de booksFromGoogle
        for (let i in items) {
            //petición a Google Books
            booksFromGoogle.push(
                //hacemos la peticion a la api de google de cada libro que extraigamos de nuestro firebase
                //recordemos que getBook genera un BookFromGoogle
                await this.getBook(
                    //items[i] => Object con la data de firebase
                    // i => firebaseId
                    Book.createBookFromFirebase(items[i], i)
                )
            );
        }
        this.booksFromGoogle = booksFromGoogle;
        //por si acaso devuelvo la lista de BookFromGoogle, aunque no es necesario. Está en el controlador
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
        //AÑADIMOS A LA LISTA
        this.booksFromGoogle.push(bookFromGoogle);
        //RENDERIZAMOS EL LIBRO
        this.view.renderStoredBook(bookFromGoogle);

    }
    /**
     * Aunque la función se llame changeReadStatus, a parte setea la fecha de lectura
     * El motivo por el que la función no refiere a este hecho es que ambas modificaciones van de la mano
     * si se modifica el estado de lectura, se modifica SIEMPRE la fecha de lectura 
     * (leido => hay fecha,
     *  no leído => no hay fecha )
     * @param {string} firebaseId 
     * @param {bool} isRead 
     */
    async changeReadStatus(firebaseId, isRead) {
        //DEBEMOS CAMBIAR EL STATUS TB EN EL ARRAY DE BOOKSFROMGOOGLE
        let read = isRead ? false : true;
        // console.log(this.booksFromGoogle)
        let book = this.booksFromGoogle.filter(el => el.firebaseId === firebaseId)[0]
        console.log(book)
        book.read = read;
        // console.log(this.booksFromFirebase);
        //Hago dos peticiones pero podría realizarse con UNA sola petición
        //lo hago así porque selecciono directamente el ENDPOINT del atributo en cuestión que quiero modificar
        await HttpRequest.changeReadStatus(firebaseId, isRead);
        await HttpRequest.setReadingDate(firebaseId, read)
        //AQUÍ HABRÁI QUE RENDERIZAR
        this.view.renderStoredBook(book, read)
    }
    /**
     * Comprueba si la lista de BooksFromGoogle del controlador contiene un libro específico
     * @param {string} selfLink 
     * @returns 
     */
    existsStoredBook(selfLink) {
        return this.booksFromGoogle.find(e => e.selfLink === selfLink);
    }
    /**
     * Función iniciadora de la aplicación...
     * Carga Todos los libros de firebase y renderiza los leídos y no leídos
     */
    async init() {

        await this.getGoogleBooksFromFirebase();

        //cargamos la data
        //cargamos los libros leidos y pendientes
        this.view.renderBooks(this.filterBooksByReadStatus(false), false);
        this.view.renderBooks(this.filterBooksByReadStatus(true), false, true);
        //añadir paginación...
    }


}