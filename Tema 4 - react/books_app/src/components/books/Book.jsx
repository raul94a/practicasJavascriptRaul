import './Book.css'
import { BookModal } from '../modal/BookModal'
import { useState } from 'react';
import noimage from '../../assets/img/noimage.png'

const Book = ({ book, fromSearch = true }) => {
    const [activeModal, changeModalStatus] = useState(false);


    let imageLinks = book.volumeInfo.imageLinks;
    let hasImageLinks = imageLinks ? true : false;
    let hasSmallThumbnail = hasImageLinks ? imageLinks['smallThumbnail'] ? true : false : false
    const { volumeInfo } = book;


    return (
        <>
            {activeModal && <BookModal onClick={changeModalStatus} book={book} fromSearch={fromSearch} />}
            <section key={book['selfLink']} style={{ height: '350px', width: '200px' }} className='book-card' onClick={() => {
                changeModalStatus(!activeModal)
                window.scrollTo(0,0);
            
            }}>
                <img src={hasSmallThumbnail ? imageLinks['smallThumbnail'] : noimage} alt={`${book.volumeInfo.title} cover page`} />
                <article className='book-card-info'>
                    <p>{volumeInfo.title}</p>
                    <p>{volumeInfo.authors}</p>
                </article>
            </section>

        </>
    )

}
export default Book