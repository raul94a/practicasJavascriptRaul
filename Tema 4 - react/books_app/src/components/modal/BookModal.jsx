import ReactDOM from "react-dom";

import './BookModal.css'
import ModalDescription from "./ModalDescription";
import ModalHeader from "./ModalHeader";


const BackDrop = ({ onClick }) => {
    return (<>{ReactDOM.createPortal(<div className='active-backdrop' onClick={() => onClick(false)}></div>, document.getElementById('backdrop'))}</>)
}



const ModalOverlay = ({ book }) => {
    const { volumeInfo, selfLink, accessInfo, saleInfo } = book;
    // let hasImageLinks = volumeInfo.imageLinks ? true : false;
    // let hasSmallThumbnail = hasImageLinks ? volumeInfo.imageLinks['smallThumbnail'] ? true : false : false
    return (
        <div className="modal-active extra-info-card extra-info-card-move">
            <ModalHeader volumeInfo={volumeInfo} />
            <ModalDescription description={volumeInfo.description} />
            <div className="btnControl">
                <button data-selfLink={book.selfLink} className="btn-firebase">Añadir a pendientes</button>
                <button>Leer en línea</button>
            </div>
        </div>
    )
}




const BookModal = ({ book, onClick }) => {
    return (
        <>
            <BackDrop onClick={onClick} />
            {ReactDOM.createPortal(<ModalOverlay book={book} />, document.getElementById('modal'))}

        </>
    )
}
export default BookModal