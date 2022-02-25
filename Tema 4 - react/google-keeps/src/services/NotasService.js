class NotasService {

    static endpoint = 'https://booksapp-7847c-default-rtdb.europe-west1.firebasedatabase.app/notas.json';



    static async post(notas = []) {
        await fetch(this.endpoint, {
            method: 'PUT',
            body: JSON.stringify(notas),
        });
    }

    static async get() {
        let response = await fetch(this.endpoint).then(async res => {
            console.log(res)
            return await res.json()
        });
        console.log(response);
    }

}