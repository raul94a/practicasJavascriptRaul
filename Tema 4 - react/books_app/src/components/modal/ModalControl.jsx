import { useState } from 'react';
import FirebaseBook from '../../models/FirebaseBook'
import HttpRequest from '../../services/HttpRequest';
import './ModalControl.css'
const ModalControl = ({ book, accessInfo, userBooks, addBook, fromSearch }) => {
    let existsInUser = userBooks.find(bookIter => bookIter.selfLink === book.selfLink) ? true : false;
    const [isBookRegistered, changeResgisteredStatus] = useState(existsInUser)
    const [loadingPostToFirebase, changeLoadingPostToFirebaseStatus] = useState(false);
    
    if (fromSearch) {
        return (
            <div className="btnControl">
                {!isBookRegistered && <button disabled={loadingPostToFirebase} className="btn-firebase" onClick={
                    async () => {
                        changeLoadingPostToFirebaseStatus(true)
                        let firebaseBook = new FirebaseBook(book.selfLink)
                        await HttpRequest.postToFirebase(firebaseBook);
                        setTimeout(() => {
                            changeLoadingPostToFirebaseStatus(false)
                            book.addFirebaseData(firebaseBook)
                            addBook(book);
                            // console.log(book)
                            changeResgisteredStatus(true)
                        }, 1000)

                    }
                }>{loadingPostToFirebase ? 'Cargando...' : 'Añadir a pendientes'}</button>}
                {accessInfo.webReaderLink && <a href={accessInfo.webReaderLink} target="_blank" className="btn-leer-linea">Leer en línea</a>}
            </div>
        )
    }
    return (
        <div className="btnControl">
            <button disabled={loadingPostToFirebase} className="btn-firebase" onClick={
                async () => {
                    changeLoadingPostToFirebaseStatus(true)
                    book.read = !book.read;
                    await HttpRequest.changeReadStatus(book.firebaseId, book.read)
                    await HttpRequest.setReadingDate(book.firebaseId, book)
                    setTimeout(() => {
                        changeLoadingPostToFirebaseStatus(false)
                        addBook(book, false);

                    }, 1000)

                }
            }>{loadingPostToFirebase ? 'Cargando...' : !book.read ? 'Pasar a leídos' : 'Pasar a pendientes de leer'}</button>
            {accessInfo.webReaderLink && <a href={accessInfo.webReaderLink} target="_blank" className="btn-leer-linea">Leer en línea</a>}
        </div>
    )

}
export default ModalControl