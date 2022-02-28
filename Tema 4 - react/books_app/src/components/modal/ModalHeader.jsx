import './ModalHeader.css'
import noimage from '../../assets/img/noimage.png'
import Rating from '../UI/Rating';
const ModalHeader = ({volumeInfo}) => {
    const {imageLinks, publishedDate, title, authors, categories, pageCount, averageRating, ratingsCount} = volumeInfo;
    let hasImageLinks = imageLinks ? true : false;
    let hasSmallThumbnail = hasImageLinks ? imageLinks['smallThumbnail'] ? true : false : false
    return (
        <section className="header-extra-card">
            <article className="left-header-extra-card">
                <img src={hasSmallThumbnail ? imageLinks['smallThumbnail'] : noimage} alt="Book photo" />
                <p>Fecha de publicación: {publishedDate || 'Desconocido'}</p>
            </article>
            <article className="right-header-extra-card">
                <h1>{title}</h1>
                <h2>{authors}</h2>
                <div className="extra-card-book-info">
                    <h3>Información general</h3>
                    <p>{categories ? categories[0] : 'Desconocido'}</p>
                    <p>Número de páginas: {pageCount || 'Desconocido'}</p>
                    <section className="average-rating-stars">

                        <Rating averageRating={averageRating} ratingsCount={ratingsCount}/>
                    </section>
                    
                </div>
            </article>
        </section>
    )
}
export default ModalHeader