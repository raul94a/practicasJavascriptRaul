import './Book.css'
import BookModal from '../modal/BookModal'
import { useState } from 'react';
import noimage from '../../assets/img/noimage.png'

const Book = ({ book }) => {
    const [activeModal, changeModalStatus] = useState(false);

    let imageLinks = book.volumeInfo.imageLinks;
    let hasImageLinks = imageLinks ? true : false;
    let hasSmallThumbnail = hasImageLinks ? imageLinks['smallThumbnail'] ? true : false : false
    const { volumeInfo } = book;
    return (
        <>
            {activeModal && <BookModal onClick={changeModalStatus} book={book} />}
            <section className='book-card' onClick={() => changeModalStatus(!activeModal)}>
                <img src={hasSmallThumbnail ? imageLinks['smallThumbnail'] : noimage} alt='image' />
                <article className='book-card-info'>
                    <p>{volumeInfo.title}</p>
                    <p>{volumeInfo.authors}</p>
                </article>
            </section>
        </>

    )

}
export default Book