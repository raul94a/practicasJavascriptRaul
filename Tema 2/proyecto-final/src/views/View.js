export class View {
    $(selector) {
        return document.querySelector(selector)
    }

    createDiv() {
        return document.createElement('div')
    }
    createImg() {
        return document.createElement('img')
    }
    createParagraph() { return document.createElement('p') }

    createButton() { return document.createElement('button') }

    toggleBackdrop() {
        let backdrop = this.$('.backdrop');
        console.log(backdrop)
        backdrop.classList.toggle('ocultar');
    }
    toggleExtraInfoCard(active = false, element = '') {
        let extraCardInfo = active ? this.$('.extra-info-card-move') : element;
        extraCardInfo.classList.toggle('extra-info-card-move');
        extraCardInfo.classList.toggle('ocultar')
    }

    createBookCard(book) {
        let volumeInfo = book.volumeInfo;
        let bookTitle = volumeInfo.title;
        let imageLinks = volumeInfo.imageLinks;
        let bookAuthor = volumeInfo.authors;
        let bookCardContainer = this.createDiv();
        bookCardContainer.classList.add('contenedor-book-card');
        let bookCard = this.createDiv();
        bookCard.classList.add('book-card')
        let bookBackImage = this.createDiv();
        bookBackImage.classList.add('sombreado-card-libro');
        let img = this.createImg();
        let infoCard = this.createDiv();
        let title = this.createParagraph();
        let author = this.createParagraph();
        let defaultImage = '';
        if (!imageLinks) {
            defaultImage = 'https://food-rating.com/static/img/image-not-available.png';
        }

        img.setAttribute('src', !imageLinks ? defaultImage : imageLinks.smallThumbnail);
        bookCard.append(img);
        infoCard.classList.add('book-card-info')
        title.textContent = bookTitle;
        author.textContent = bookAuthor;
        infoCard.append(title);
        infoCard.append(author);
        bookCard.append(infoCard);
        bookCardContainer.append(bookCard)
        return bookCardContainer;


    }

    createExtraBookCard(book, isSearched = true) {
        let extraCard = this.createDiv();

        let volumeInfo = book.volumeInfo;
        let bookTitle = volumeInfo.title;
        let imageLinks = volumeInfo.imageLinks;
        let bookCategory = volumeInfo.categories;
        let bookAuthor = volumeInfo.authors;
        let bookDescription = volumeInfo.description ? volumeInfo.description : 'Descripción no disponible';
        let img = this.createImg();
        let title = this.createParagraph();
        let author = this.createParagraph();
        let category = this.createParagraph()
        extraCard.classList.add('extra-info-card', 'ocultar');
        let description = this.createParagraph();
        category.textContent = bookCategory;
        description.textContent = bookDescription;
        title.textContent = bookTitle;
        author.textContent = bookAuthor;
        //AÑADIR CLASE DE STYLE DE BOTON
        extraCard.append(title);
        extraCard.append(author);
        extraCard.append(category);
        extraCard.append(description);
        //
        if(isSearched){
            let btnAddToList = this.createButton();
            btnAddToList.textContent = "Añadir a pendientes";
            btnAddToList.setAttribute('data-selfLink', book.selfLink);
            btnAddToList.classList.add('btn-firebase')
            extraCard.append(btnAddToList);
        }else{ //Información mostrada cuando YA lo tenemos en PENDIENTE o en LEIDO
            //se captura la propiedad read
            let read = book.read;
            //si el libro no está leido...
            if(!read){
                let btnRead = this.createButton();
                btnRead.textContent = 'He leído el libro';
                btnRead.setAttribute('data-firebase', book.firebaseId);
                btnRead.classList.add('btnReadBook');
                extraCard.append(btnRead)
            }else{
                let btnRead = this.createButton();
                btnRead.textContent = 'Eliminar de libros leídos';
                btnRead.setAttribute('data-firebase', book.firebaseId);
                btnRead.classList.add('btnReadBook-remove');
                extraCard.append(btnRead)
            }
        }


        return extraCard;


    }



    renderSearch(booksFromGoogle) {
        let searchContainer = this.$('.contenedor-busqueda');
        searchContainer.textContent = '';
        let defaultImage = '';
        for (let book of booksFromGoogle) {
            //DEFINICIÓN DE VARIABLES A UTILIZAR
            let volumeInfo = book.volumeInfo;
            let bookTitle = volumeInfo.title;
            let imageLinks = volumeInfo.imageLinks;
            let bookCategory = volumeInfo.categories;
            let bookAuthor = volumeInfo.authors;
            let bookDescription = volumeInfo.description ? volumeInfo.description : 'Descripción no disponible';
            console.log(bookDescription)
            //DEFINICION DE ELEMENTOS DEL DOM A UTILIZAR
            let bookCardContainer = this.createDiv();
            bookCardContainer.classList.add('contenedor-book-card');
            let bookCard = this.createDiv();
            bookCard.classList.add('book-card')
            let bookBackImage = this.createDiv();
            bookBackImage.classList.add('sombreado-card-libro');
            let img = this.createImg();
            let infoCard = this.createDiv();
            let title = this.createParagraph();
            let author = this.createParagraph();
            let category = this.createParagraph()
            let extraCard = this.createDiv();
            let description = this.createParagraph();
           
            if (!imageLinks) {
                defaultImage = 'https://food-rating.com/static/img/image-not-available.png';
            }

            img.setAttribute('src', !imageLinks ? defaultImage : imageLinks.smallThumbnail);
            bookCard.append(img);
            infoCard.classList.add('book-card-info')
            title.textContent = bookTitle;
            author.textContent = bookAuthor;
            infoCard.append(title);
            infoCard.append(author);
            bookCard.append(infoCard);
            bookCardContainer.append(bookCard)

            //además, para cada libro debemos crear OTRO div, que esté al mismo lvl que bookCard para que al hacer click se abra un menú con mucha informacíon
            extraCard.classList.add('extra-info-card', 'ocultar');
            //descripcion
            category.textContent = bookCategory;
            description.textContent = bookDescription;
            let copyTitle = this.createParagraph();
            copyTitle.textContent = bookTitle;
            let copyAuthor = this.createParagraph();
            copyAuthor.textContent = bookAuthor;
            //REALMENTE DEBERÍA REALIZAR UNA PETICIÓN A FIREBASE Y COMPROBAR QUE EL SELFLINK NO EXISTE EN MI BASE DE DATOS
            //SI NO EXISTE AÑADO EL BOTON. SI EXISTE AÑADO UN PARRAFO DICIENDO QUE YA HA SIDO AÑADIDO A LA LISTA DE PENDIENTES
            //ESA MISMA CLASE SERÍA UTILIZADA CUANDO PINCHO EN EL BOTON, SUSTITUYENDO EL BOTON DE AÑADIR POR ESA INFORMACIÓN
            //POR TANTO HAY DOS CASOS: 1) QUE YA EXISTA PREVIAMENTE EN FIREBASE Y NO PUEDA AÑADIRSE Y 2) QUE YA HAYA SIDO PULSADO EL BOTON
            //DE AÑADIR
            //PODRIAMOS MEJORAR INFINITAMENTE ESTA SITUACIÓN SI DESPUES CONSTRUIMOS LOS OBJETOS DE LIBROS DE GOOGLE Y FILTRAMOS POR NOMBRE
            let btnAddToList = this.createButton();
            btnAddToList.textContent = "Añadir a pendientes";
            btnAddToList.setAttribute('data-selfLink', book.selfLink);
            btnAddToList.classList.add('btn-firebase')
            //AÑADIR CLASE DE STYLE DE BOTON
            extraCard.append(copyTitle);
            extraCard.append(copyAuthor);
            extraCard.append(category);
            extraCard.append(description);
            extraCard.append(btnAddToList);
            bookCardContainer.append(extraCard);
            searchContainer.append(bookCardContainer);
        }
    }
    renderBooks(booksFromGoogle, isSearched = true, isRead = false) {
        let searchContainer = isSearched 
        ? this.$('.contenedor-busqueda')
        : isRead 
            ? this.$('.contenedor-leidos-render')
            : this.$('.contenedor-pendientes-render') 
        
        // this.$('.contenedor-busqueda');
        //searchContainer.textContent = '';
        for (let book of booksFromGoogle) {
            let bookCardContainer = this.createBookCard(book);
            let extraCard = this.createExtraBookCard(book, isSearched);
            bookCardContainer.append(extraCard);
            searchContainer.append(bookCardContainer);
        }
    }
    renderStoredBook(bookFromGoogle, read = false) {
        let pendientes = this.$(`${!read ? ".contenedor-pendientes-render" : ".contenedor-leidos-render" }`);
        let bookCardContainer = this.createBookCard(bookFromGoogle);
        let extraCard = this.createExtraBookCard(bookFromGoogle, false);
        bookCardContainer.append(extraCard);
        pendientes.append(bookCardContainer);

    }
}