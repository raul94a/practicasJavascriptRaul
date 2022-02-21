import { useContext } from "react";
import BookContext from "../../state/book-context";
import Book from "../books/Book";
const UserBooksPage = ({showReadBooks = true}) => {
    const context = useContext(BookContext)
    console.log(context.userBooks)
    return (
        <div className='contenedor-libros'>
            {context.userBooks.filter(book => showReadBooks ? book.read : !book.read).map(book => <Book book={book} fromSearch={false}></Book>)}
        </div>
    )
}
export default UserBooksPage