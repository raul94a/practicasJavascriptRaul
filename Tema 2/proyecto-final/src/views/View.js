import { BookFromGoogle } from "../models/BookFromGoogle.js"

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

    createH1() { return document.createElement('h1') }
    createH2() { return document.createElement('h2') }
    createH3() { return document.createElement('h3') }

    /**
     * Controla la aparición y desaparición del backdrop
     * 
     */
    toggleBackdrop() {
        let backdrop = this.$('.backdrop');
        console.log(backdrop)
        backdrop.classList.toggle('ocultar');
    }
    /**
     * Controla la desapación o aparición del modal de información extra
     * En el caso de que el modal no esté activo, se activa, pues element 
     * se refiere al elemento a activar. 
     * Si está activa, se desactiva el ÚNICO elemento que tiene la clase extra-info-card-move (es decir, el elemento activo)
     * @param {boolean} active 
     * @param {HTMLElement} element 
     */
    toggleExtraInfoCard(active = false, element = '') {
        let extraCardInfo = active ? this.$('.extra-info-card-move') : element;
        extraCardInfo.classList.toggle('extra-info-card-move');
        extraCardInfo.classList.toggle('ocultar')
    }

    createStar(firstClass = 'far', secondClass) {
        let star = document.createElement('i');
        star.classList.add(firstClass, secondClass);
        return star;

    }


    /**
     * Crea las estrellas de valoración del libro
     * @param {Float} stars 
     * @param {number} ratingsCount 
     * @returns 
     */
    createAverageRatingStars(stars = 0, ratingsCount = 0) {
        // <i class="far fa-star"></i>
        // <i class="fas fa-star"></i>
        // <i class="fas fa-star-half-alt"></i>
        let div = this.createDiv();
        div.classList.add('average-rating-stars');
        let parteEntera = parseInt(stars);
        let numeroEstrellasPintadas = 0;
        //pintamos las estrellas completas
        for (let i = 0; i < parteEntera; i++) {
            div.append(this.createStar('fas', 'fa-star'));
            numeroEstrellasPintadas++;
        }
        //media estrella
        let parteDecimal = (stars - parteEntera)
        let parteDecimalSplit = parteDecimal.toString().split('.')

        if (parteDecimalSplit.length > 1) {
            let pd = parseFloat(parteDecimal[1]);
            console.log(pd)

            div.append(this.createStar('fas', 'fa-star-half-alt'));
            numeroEstrellasPintadas++;

        }
      

        let resto = 5 - numeroEstrellasPintadas;
        
        //pintamos el resto de estrellas
        for (let i = 0; i < resto; i++) {
            div.append(this.createStar('far', 'fa-star'))
        }

        let p = this.createParagraph();
        //pintamos el número de valoraciones del libro
        p.textContent = `(${ratingsCount})`;
        p.style.display = 'inline-block'
        div.append(p)
        return div;
    }
    /**
     * Crea el Card del libro en cuestión
     * =>Necesaria la refactorización en componentes
     * @param {BookFromGoogle} book 
     * @returns 
     */
    createBookCard(book) {
        console.log(book)
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
        //si la imagen viene nula se le pone una por defecto!
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
    //intento fallido 
    cleanDescription(description = ''){
        
       
        return description;
    }

    /**
     * Pinta el botón de paginación con el caracter correspondiente (flecha o icono)
     * @param {string} name 
     * @param {*} className 
     * @returns 
     */
    paginationButton(name, className = ''){
        let button = this.createButton();
        button.classList.add('btn-pagination')
        if(name === '->'){
            let i = document.createElement('i');
            i.classList.add('fas', 'fa-arrow-right');
            button.append(i);
            
        }else if(name === '<-'){
            let i = document.createElement('i');
            i.classList.add('fas', 'fa-arrow-left');
            button.append(i);
        }else{
            button.textContent = name;

        }
        return button;
    }
    /**
     * Pintamos el control de paginación
     * @param {Array(BookFromGoogle)} books 
     * @returns 
     */
    paginateSearch(books){
        const numberOfBooks = books.length;
        console.log(numberOfBooks);
        const itemsPerPage = 10;
        console.log(itemsPerPage);
        const pages = numberOfBooks / itemsPerPage;
        console.log(pages);

        let control = this.createDiv();
        control.classList.add('pagination-control');
        let backwards = this.paginationButton('<-');
        control.append(backwards);
        //aqui debemos determinar el número de páginas
        for(let i = 1; i <= pages; i++){
            let pageNumber = this.paginationButton(`${i}`);
            control.append(pageNumber);
        }
        //
        let forwards = this.paginationButton('->');
        control.append(forwards);
        return control;
    }

    /**
     * Recibe un BookFromGoogle como primer parámetro ya que sus datos será los necesarios para pintar el card de información extra
     * La función necesita los otros dos parámetros -opcionales- porque esta también es utilizada para renderizar el extra card
     * de los libros buscados
     * El último parámetro se utiliza para NO pintar el botón de AÑADIR A PENDIENTES en búsqueda de libros
     * en el caso de que el selfLink exista en Firebase
     * @param {BookFromGoogle} book 
     * @param {Boolean} isSearched 
     * @param {Array BookFromGoogle} storedBooks 
     * @returns {HTMLElement}
     */
    //esta función se debe separar en los componentes internos
    createExtraBookCard(book, isSearched = true, storedBooks = []) {
        // console.log(book)
        let extraCard = this.createDiv();
        let volumeInfo = book.volumeInfo;

        let bookTitle = volumeInfo.title;
        let imageLinks = volumeInfo.imageLinks;
        let bookCategory = volumeInfo.categories;
        let bookAuthor = volumeInfo.authors;
        let bookDescription = volumeInfo.description ? volumeInfo.description : 'Descripción no disponible';
       bookDescription = this.cleanDescription(bookDescription);
        
        let img = this.createImg();
        let title = this.createH1();
        let author = this.createH2();
        let category = this.createParagraph();
        let pageCount = this.createParagraph();
        let publishedDate = this.createParagraph();
        let rating = this.createParagraph();
        extraCard.classList.add('extra-info-card', 'ocultar');
        let description = this.createParagraph();
        if(bookDescription === 'Descripción no disponible'){
            description.classList.add('center-p')
        }
        let headerExtraCard = this.createDiv();
        headerExtraCard.classList.add('header-extra-card');
        let leftSectionHeaderExtraCard = this.createDiv();
        leftSectionHeaderExtraCard.classList.add('left-header-extra-card');
        let rightSectionHeaderExtraCard = this.createDiv();
        rightSectionHeaderExtraCard.classList.add('right-header-extra-card');
        rating = volumeInfo.averageRating ? volumeInfo.averageRating : 'Valoración no disponible'
        pageCount.textContent = volumeInfo.pageCount ? 'Numero de paginas: ' + volumeInfo.pageCount : 'Numero de paginas no disponible';
        category.textContent = bookCategory;
        publishedDate.textContent = volumeInfo.publishedDate ? 'Fecha de publicación: ' + volumeInfo.publishedDate : 'Fecha de publicación no disponible';
        description.textContent = bookDescription;
        title.textContent = bookTitle;
        author.textContent = bookAuthor;
        img.setAttribute('src', `${imageLinks ? imageLinks.smallThumbnail : 'https://food-rating.com/static/img/image-not-available.png'}`);
        leftSectionHeaderExtraCard.append(img);
        leftSectionHeaderExtraCard.append(publishedDate);

        let bookInfoLeftSectionHeaderExtraCard = this.createDiv();
        let ratingStars = this.createAverageRatingStars(parseFloat(volumeInfo.averageRating ? rating : 0), volumeInfo.ratingsCount ? volumeInfo.ratingsCount : 0);
        bookInfoLeftSectionHeaderExtraCard.classList.add('extra-card-book-info');
        let bookInfoTitle = this.createH3();
        bookInfoTitle.textContent = 'Información general';
        bookInfoLeftSectionHeaderExtraCard.append(bookInfoTitle);
        bookInfoLeftSectionHeaderExtraCard.append(category);
        bookInfoLeftSectionHeaderExtraCard.append(pageCount);
        bookInfoLeftSectionHeaderExtraCard.append(ratingStars);
        // leftSectionHeaderExtraCard.append(bookInfoLeftSectionHeaderExtraCard);
        // leftSectionHeaderExtraCard.append(pageCount);
        rightSectionHeaderExtraCard.append(title);
        rightSectionHeaderExtraCard.append(author);
        // rightSectionHeaderExtraCard.append(bookInfoTitle);
        rightSectionHeaderExtraCard.append(bookInfoLeftSectionHeaderExtraCard);
        headerExtraCard.append(leftSectionHeaderExtraCard);
        headerExtraCard.append(rightSectionHeaderExtraCard);
        extraCard.append(headerExtraCard);
        // extraCard.append(bookInfoTitle)
        // extraCard.append(bookInfoLeftSectionHeaderExtraCard)
        //AÑADIR CLASE DE STYLE DE BOTON
        // extraCard.append(this.createAverageRatingStars(parseFloat(volumeInfo.averageRating ? rating : 0)));
        let descriptionTitle = this.createH1();
        descriptionTitle.textContent = 'Descripción'
        descriptionTitle.id = 'extra-card-description'
        extraCard.append(descriptionTitle);
        extraCard.append(description);
        //
        let divBtnControl = this.createDiv();
        divBtnControl.classList.add('btnControl');
        //SI EL LIBRO A RENDERIZAR PERTENECE A UNA BÚSQUEDA...
        if (isSearched) {
            //buscamos si en storedBooks hay algún selfLink que coincida con el selflink del argumento book
            let exists = storedBooks.some(e => e.selfLink === book.selfLink);
                let btnAddToList = this.createButton();
                let btnText = this.createParagraph();
                btnText.textContent = 'El libro ya ha sido añadido a tu lista';
                btnText.style.color = 'white';
                if(!exists){ //si no existe se renderiza el botón de añadir a pendientes
                    btnAddToList.textContent = "Añadir a pendientes";
                    btnAddToList.setAttribute('data-selfLink', book.selfLink);
                    btnAddToList.classList.add('btn-firebase')
                    divBtnControl.append(btnAddToList);

                }else{
                    divBtnControl.append(btnText);
                }
           
            
        } else { //Información mostrada cuando YA lo tenemos en PENDIENTE o en LEIDO
            //se captura la propiedad read
            let read = book.read;
            //si el libro no está leido...
            //SE PODRÍA HACER CON UN TERNARIO PERO NO TENÍA GANAS DE PENSAR NADA
            if (!read) {
                let btnRead = this.createButton();
                btnRead.textContent = 'He leído el libro';
                btnRead.setAttribute('data-firebase', book.firebaseId);
                btnRead.classList.add('btnReadBook');
                divBtnControl.append(btnRead)
            } else {
                let btnRead = this.createButton();
                btnRead.textContent = 'Eliminar de libros leídos';
                btnRead.setAttribute('data-firebase', book.firebaseId);
                btnRead.classList.add('btnReadBook-remove');
                divBtnControl.append(btnRead)
            }
        }

        let btnRead = document.createElement('a');
        btnRead.setAttribute('href', book.accessInfo.webReaderLink);
        btnRead.setAttribute('target', '__blank')
        btnRead.classList.add('btn-read')
        //si hay un link de lectura...
        if(book.accessInfo.webReaderLink){
            btnRead.textContent = 'Leer ONLINE'
            divBtnControl.append(btnRead);

        }
        extraCard.append(divBtnControl);
        return extraCard;


    }


        /**
         * @deprecated
         * @param {*} booksFromGoogle 
         */
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


    renderBooks(booksFromGoogle, isSearched = true, isRead = false, storedBooks = []) {
        let searchContainer = isSearched
            ? this.$('.contenedor-busqueda')
            : isRead
                ? this.$('.contenedor-leidos-render')
                : this.$('.contenedor-pendientes-render')


        // this.$('.contenedor-busqueda');
        // searchContainer.textContent = '';
        if (isSearched) {
            searchContainer.textContent = '';
        }
        for (let book of booksFromGoogle) {
            let bookCardContainer = this.createBookCard(book);
            let extraCard = this.createExtraBookCard(book, isSearched, storedBooks);
            bookCardContainer.append(extraCard);
            searchContainer.append(bookCardContainer);
        }
        //searchContainer.parentElement.append(this.paginateSearch(booksFromGoogle))
    }
    /**
     * Paginamos el resultado de búsqueda, generando 10 elementos por página. Esta misma función servirá
     * para controlar la paginación, ya que al pinchar en los botones podemos ir renderizando la página siguiente o anterior...
     * @param {Array(BookFromGoogle)} searchedBooks =>Elementos que quiero mostrar en la paginación
     * @param {Number} number => Número de elementos en paginación
     * @param {Array(BookFromGoogle)} storedBooks
     */
    renderSearchedBooksWithPagination(searchedBooks, number = 10, storedBooks = []){
        let searchContainer = this.$('.contenedor-busqueda');
        searchContainer.textContent = '';
        for(let i = (number - 10); i < number; i++){
            let bookCardContainer = this.createBookCard(searchedBooks[i]);
            let extraCard = this.createExtraBookCard(searchedBooks[i], true, storedBooks);
            bookCardContainer.append(extraCard);
            searchContainer.append(bookCardContainer);
        }
        //searchContainer.parentElement.append(this.paginateSearch(searchedBooks));
    }
    /**
     * Renderiza un libro que VAYA a ser almacenado en FIREBASE (NO LEIDOS) => read es false
     * Renderiza un libro que haya cambiado su estado de lectura (Cambia de NO LEIDOS a LEIDOS y viceversa)
     * @param {BookFromGoogle} bookFromGoogle 
     * @param {Boolean} read 
     */
    renderStoredBook(bookFromGoogle, read = false) {
        let pendientes = this.$(`${!read ? ".contenedor-pendientes-render" : ".contenedor-leidos-render"}`);
        let bookCardContainer = this.createBookCard(bookFromGoogle);
        let extraCard = this.createExtraBookCard(bookFromGoogle, false);
        bookCardContainer.append(extraCard);
        pendientes.append(bookCardContainer);

    }

   
}