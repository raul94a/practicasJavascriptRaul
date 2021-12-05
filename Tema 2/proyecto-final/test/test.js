///script de testeo
// import config from '../src/config/config';
// console.log(config)
//peticiones HTTP a la API
/**
 * 
 * @param {String} libro 
 * @param {boolean} isFirebaseRequest 
 * @returns {Promise}
 */
const httpGet = async (libro, isFirebaseRequest) => {
    //
    let url =
        isFirebaseRequest
            ? 'https://booksapp-7847c-default-rtdb.europe-west1.firebasedatabase.app/libros.json'
            : `https://www.googleapis.com/books/v1/volumes?q=${libro}&key=AIzaSyDUmVoQie3zUY6ESE4lF94CU0qyV9oswS8`;
    //vamos a declarar una promesa
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);

        xhr.responseType = 'json';

        xhr.onload = function () {
            resolve(xhr.response);
            //console.log(xhr.status);
        };

        xhr.send();
    });

    return promise;
}

const httpGetBook = async selfLink => {
    //
    let url = selfLink;
    //vamos a declarar una promesa
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'json';

        xhr.onload = function () {
            resolve(xhr.response);
        };

        xhr.send();
    });

    return promise;
}
//consideramos que el libro ya está creado y por lo tanto tiene el selfLink
const post = (book) => {
    let url = `https://booksapp-7847c-default-rtdb.europe-west1.firebasedatabase.app/libros.json`;
    //vamos a declarar una promesa
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);

        xhr.responseType = 'json';

        xhr.onload = function () {
            resolve(xhr.response);
            // console.log(xhr.status, xhr.response);
            book.firebaseId = xhr.response['name']
        };

        xhr.send(JSON.stringify(book));
    }
    )
}
const $$ = async () => {
    let item = await httpGet('', true)
    let book = null;
    for (let i in item) {
        book = Book.createBookFromFirebase(item[i], i);
        let bookFromGoogle = await BookFromGoogle.getBook(book);
        console.log(bookFromGoogle);
    }
}
const $ = async () => {
    let books = [];
    let items = await httpGet('j', true).then(e => e);
    for (let i in items) {
        let book = Book.createBookFromFirebase(items[i], i);
        books.push(book);
    }
    console.log(books);
    // BookFromMap.addFirebaseData(books)
    let item = await httpGet('juramentada', false).then(e => e['items'][0]);
    // console.log(item)
    let bookFromAPI = new BookFromMap(item);
    bookFromAPI.addFirebaseData(books[0])
    console.log(bookFromAPI)

}

const insertIntoFirebase = async () => {
    let item = await httpGet('palabras radiantes', false).then(e => e['items'][0]);
    let bookfromgoogle = new BookFromGoogle(item);
    let book = new Book(bookfromgoogle.selfLink);
    await post(book);

}
//esta funcion devuelve los libros de google con los datos de firebase (Array de BookFromGoogle)
//¿NECESITO REALMENTE TRABAJAR CON LOS DATOS DE FIREBASE? NO...DIRECTAMENTE PUEDO GENERAR LOS BOOKSFROMGOOGLE   
const getGoogleBooksFromFirebase = async () => {
    //petición a FIREBASE
    let items = await httpGet(true);
    let booksFromGoogle = [];
    for (let i in items) {
        booksFromGoogle.push(
        //hacemos la peticion a la api de google de cada libro que extraigamos de nuestro firebase
            await BookFromGoogle
                .getBook(
                
                    Book.createBookFromFirebase(items[i], i)
                )
        );
    }

    return booksFromGoogle
}