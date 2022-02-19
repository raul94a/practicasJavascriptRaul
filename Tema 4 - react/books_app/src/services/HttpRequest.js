class HttpRequest {
    /**
     * isFirebaseRequest discrimina entre peticiones de libros a Google o a Firebase
     * read es solo utilizado para búsqueda de libros en la API de Google (API KEY NECESARIA)
     * @param {boolean} isFirebaseRequest 
     * @param {string} libro 
     * @returns devuelve el JSON con la lista de libros encontrados
     */
    static async httpGet(isFirebaseRequest, libro = '') {
        //poner tu api key de google!
        const key = 'AIzaSyDUmVoQie3zUY6ESE4lF94CU0qyV9oswS8';
        //
        let url =
            isFirebaseRequest
                ? 'https://booksapp-7847c-default-rtdb.europe-west1.firebasedatabase.app/libros.json'
                : `https://www.googleapis.com/books/v1/volumes?q=${libro}&maxResults=40&key=${key}`;
        //vamos a declarar una promesa
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);

            xhr.responseType = 'json';

            //cuando esta función termine, se resuelve la promesa y devuelve el resultado (JSON)
            xhr.onload = function () {
                resolve(xhr.response);
                //console.log(xhr.status);
            };
            xhr.onerror = function(){reject(xhr.response)}

            xhr.send();
        });

        return promise;
    }
    /**
     * Función necesaria para realizar la petición de UN solo libro a la API de GOOGLE
     * 
     * @param {string} selfLink 
     * selfLink es realmente el endpoint del libro. En este caso no se necesita API KEY
     * @returns JSON del libro
     */
    static async httpGetBook(selfLink) {
        //
        let url = selfLink;
        //vamos a declarar una promesa
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.responseType = 'json';
            //cuando termine la función on load se devuelve la promesa, que contiene el JSON del libro
            xhr.onload = function () {
                resolve(xhr.response);
            };

            xhr.send();
        });

        return promise;
    }
    /**
     * Función para realizar un post a la Real Time Database de Firebase (endpoint de libros)
     * Requiere una variable de tipo Book, que contiene los datos de interés para ser almacenados,
     * entre ellos el endpoint del libro para realizar una petición posterior.
     * Esta función será llamada tras realizar una búsqueda de un libro, cuando el usuario decida añadirlo
     * a la lista de libros pendientes de leer.
     * 
     * Internamente, la función añade a la instancia de Book pasada por referencia la clave generada por Firebase
     * al realizar la inserción en el endpoint de libros.
     * @param {FirebasecitoniBook} book 
     */
    static async postToFirebase(book) {
        let url = `https://booksapp-7847c-default-rtdb.europe-west1.firebasedatabase.app/libros.json`;
        //vamos a declarar una promesa
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', url);

            xhr.responseType = 'json';

            xhr.onload = function () {
                resolve(xhr.response);
                // console.log(xhr.status, xhr.response);
                //necesario por si se requiere una conexión con firebase justo después de ser añadido a firebase,
                //por ejemplo, ser borrado (no implementado) o actualizado (patch) a leído
                book.firebaseId = xhr.response['name']
            };

            xhr.send(JSON.stringify(book));
        })
    }
    /**
     * cambia el estado de lectura del libro en cuestión, pasaándolo de leído a no leído y viceversa
     * @param {string} firebaseId 
     * @param {boolean} isRead 
     * @returns 
     */
    static async changeReadStatus(firebaseId, isRead = false) {
        let url = `https://booksapp-7847c-default-rtdb.europe-west1.firebasedatabase.app/libros/${firebaseId}/read.json`;
      
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('PUT', url);

            xhr.responseType = 'json';

            xhr.onload = function () {
                resolve(xhr.response);
                // console.log(xhr.status, xhr.response);
                // book.firebaseId = xhr.response['name']
            };

            xhr.send(JSON.stringify(isRead));
        })
        return promise;
    }
    /**
     * se necesita la firebaseId y el estado de lectura del libro para 
     * setear correctamente la fecha de lectura o dejarla vacía
     * @param {string} firebaseId 
     * @param {boolean} read 
     * @returns promesa 
     */
    static async setReadingDate(firebaseId, book) {
        let url = `https://booksapp-7847c-default-rtdb.europe-west1.firebasedatabase.app/libros/${firebaseId}/readDate.json`;
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('PUT', url);
            book.readDate = book.read ?  new Date().toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) : ""
            xhr.responseType = 'json';

            xhr.onload = function () {
                resolve(xhr.response);
                // console.log(xhr.status, xhr.response);
                // book.firebaseId = xhr.response['name']
            };

            xhr.send(JSON.stringify(book.readDate));
        })
        return promise;
    }

}

export default HttpRequest