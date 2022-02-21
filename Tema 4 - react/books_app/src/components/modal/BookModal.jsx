
import ReactDOM from "react-dom";
import './BookModal.css'
import ModalControl from "./ModalControl";
import ModalDescription from "./ModalDescription";
import ModalHeader from "./ModalHeader";


const BackDrop = ({ onClick }) => {
    let height = document.documentElement.offsetHeight;
    let heightClient = document.documentElement.clientHeight;
    console.log(height, heightClient)

    return (<>{ReactDOM.createPortal(<div className='active-backdrop' onClick={() => onClick(false)} style={{ height: height === 0 ? heightClient : height }}></div>, document.getElementById('backdrop'))}</>)
}



const ModalOverlay = ({ book, fromSearch }) => {
    const { volumeInfo, accessInfo } = book;
    // console.log(book)
    
    return (
        <div className="modal-active extra-info-card extra-info-card-move">
            <ModalHeader volumeInfo={volumeInfo} />
            <ModalDescription description={volumeInfo ? volumeInfo.description : 'No hay descripción disponible'} />
            <ModalControl book={book} accessInfo={accessInfo} fromSearch={fromSearch} />
        </div>
    )
}




const BookModal = ({ book, onClick, fromSearch }) => {
   
    return (
        <>
            <BackDrop onClick={onClick} />
            {ReactDOM.createPortal(<ModalOverlay book={book} fromSearch={fromSearch} />, document.getElementById('modal'))}

        </>
    )
}

const LoadingModal = (props) => {
    return (
        <>
            <BackDrop />
            {ReactDOM.createPortal(<div className="tracking-in-expand" >
                <h3>BooksApp</h3>
                <h4>Organiza tu lectura de forma eficiente</h4>
            </div>, document.getElementById('modal'))}


        </>
    )
}
export { BookModal, LoadingModal }