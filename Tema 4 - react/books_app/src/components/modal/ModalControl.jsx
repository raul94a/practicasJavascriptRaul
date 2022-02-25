import { useState, useContext } from 'react';
import FirebaseBook from '../../models/FirebaseBook'
import HttpRequest from '../../services/HttpRequest';
import './ModalControl.css'
import BookContext from '../../state/book-context';
const ModalControl = ({ book, accessInfo, fromSearch }) => {
    const bookContext = useContext(BookContext);
    let existsInUser = bookContext.userBooks.find(bookIter => bookIter.selfLink === book.selfLink) ? true : false;
    const [isBookRegistered, changeResgisteredStatus] = useState(existsInUser)
    const [loadingPostToFirebase, changeLoadingPostToFirebaseStatus] = useState(false);
    const postBookToFirebase = async (book,localId) => {
        changeLoadingPostToFirebaseStatus(true)
        let firebaseBook = new FirebaseBook(book.selfLink)
        await HttpRequest.postToFirebase(firebaseBook, localId);
        setTimeout(() => {
            changeLoadingPostToFirebaseStatus(false)
            book.addFirebaseData(firebaseBook)
            bookContext.addBook(book);
            // console.log(book)
            changeResgisteredStatus(true)
        }, 1000)

    }
    if (fromSearch) {
        return (
            <div className="btnControl">
                {!isBookRegistered && <button disabled={loadingPostToFirebase} className="btn-firebase" onClick={
                    async () => {
                      await postBookToFirebase(book,bookContext.localId)
                    }
                }>{loadingPostToFirebase ? 'Cargando...' : 'Añadir a pendientes'}</button>}
                {accessInfo.webReaderLink && <a href={accessInfo.webReaderLink} target="_blank" rel="noreferrer" className="btn-leer-linea">Leer en línea</a>}
            </div>
        )
    }
    return (
        <div className="btnControl">
            <button disabled={loadingPostToFirebase} className="btn-firebase" onClick={
                async () => {
                    changeLoadingPostToFirebaseStatus(true)
                    book.read = !book.read;
                    console.log(book)
                    await HttpRequest.changeReadStatus(book.firebaseId, book.read, bookContext.localId)
                    await HttpRequest.setReadingDate(book.firebaseId, book, bookContext.localId)
                    setTimeout(() => {
                        changeLoadingPostToFirebaseStatus(false)
                        bookContext.addBook(book, false);

                    }, 100)

                }
            }>{loadingPostToFirebase ? 'Cargando...' : !book.read ? 'Pasar a leídos' : 'Pasar a pendientes de leer'}</button>
            {accessInfo.webReaderLink && <a href={accessInfo.webReaderLink} target="_blank" rel="noreferrer" className="btn-leer-linea">Leer en línea</a>}
        </div>
    )

}
export default ModalControl