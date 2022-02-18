import './ModalHeader.css'
import noimage from '../../assets/img/noimage.png'
const ModalHeader = ({volumeInfo}) => {
    const {imageLinks, publishedDate, title, authors, categories, pageCount} = volumeInfo;
    let hasImageLinks = imageLinks ? true : false;
    let hasSmallThumbnail = hasImageLinks ? imageLinks['smallThumbnail'] ? true : false : false
    return (
        <section className="header-extra-card">
            <article className="left-header-extra-card">
                <img src={hasSmallThumbnail ? imageLinks['smallThumbnail'] : noimage} alt="Book photo" />
                <p>Fecha de publicación: {publishedDate}</p>
            </article>
            <article className="right-header-extra-card">
                <h1>{title}</h1>
                <h2>{authors}</h2>
                <div className="extra-card-book-info">
                    <h3>Información general</h3>
                    <p>{categories[0]}</p>
                    <p>Número de páginas: {pageCount}</p>
                    <section className="average-rating-stars">
                    </section>
                </div>
            </article>
        </section>
    )
}
export default ModalHeader