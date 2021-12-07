class HttpRequest {
    static async httpGet(isFirebaseRequest, libro = '') {
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
    static async httpGetBook(selfLink) {
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
                book.firebaseId = xhr.response['name']
            };

            xhr.send(JSON.stringify(book));
        })
    }

    static async changeReadStatus(firebaseId, isRead = false) {
        let url = `https://booksapp-7847c-default-rtdb.europe-west1.firebasedatabase.app/libros/${firebaseId}/read.json`;
        let readStatus = isRead ? false : true;
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('PUT', url);

            xhr.responseType = 'json';

            xhr.onload = function () {
                resolve(xhr.response);
                // console.log(xhr.status, xhr.response);
                // book.firebaseId = xhr.response['name']
            };

            xhr.send(JSON.stringify(readStatus));
        })
        return promise;
    }
    static async setReadingDate(firebaseId, read) {
        let url = `https://booksapp-7847c-default-rtdb.europe-west1.firebasedatabase.app/libros/${firebaseId}/readDate.json`;
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('PUT', url);

            xhr.responseType = 'json';

            xhr.onload = function () {
                resolve(xhr.response);
                // console.log(xhr.status, xhr.response);
                // book.firebaseId = xhr.response['name']
            };

            xhr.send(JSON.stringify( read ? new Date().toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) : ""));
        })
        return promise;
    }

}

export { HttpRequest }