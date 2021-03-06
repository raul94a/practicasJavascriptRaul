import { useContext } from "react";
import BookContext from "../../state/book-context";
import Book from "../books/Book";
const UserBooksPage = ({showReadBooks = true, setHeight}) => {
    const context = useContext(BookContext)
    setHeight(document.documentElement.clientHeight + (context.userBooks.filter(book => showReadBooks ? book.read : !book.read ).length / 5 ) * 220)
    return (
        <div className='contenedor-libros'>
            {context.userBooks.filter(book => showReadBooks ? book.read : !book.read).map(book => <Book book={book} fromSearch={false}></Book>)}
        </div>
    )
}
export default UserBooksPage