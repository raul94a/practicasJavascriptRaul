import { useState } from "react";
import HttpRequest from "../../services/HttpRequest";
import BookFromGoogle from "../../models/BookFromGoogle";
import Pagination from "../UI/Pagination";
import Book from "../books/Book";
import './SearchPage.css'

const SearchPage = ({setHeight}) => {
    const [searchInput, setSearchInput] = useState('');
    const [searchedBooks, setSearchedBooks] = useState([]);
    const [searchPage, setSearchPage] = useState(1);
    
    
  const onChangeSearchInput = (event) => {
    setSearchInput(event.target.value);
  }

  const onSubmitSearch = async (event) => {
    event.preventDefault();
    //aquí sería un buen momento para realizar una petición a la base de datos...
    let booksFromGoogle = []
    let search = await HttpRequest.httpGet(false, searchInput);
    let items = search['items']
    for (let book of items) {
      booksFromGoogle.push(new BookFromGoogle(book));
    };
    setSearchedBooks(prevState => [...booksFromGoogle]);
    setSearchInput('')
    setSearchPage(1)
    setHeight(document.documentElement.clientHeight + 350);


  }



    return (
        <>
            <form onSubmit={(e) => onSubmitSearch(e)} className='form-search'>
                <input type="text" placeholder="Introduce libro o autor..." value={searchInput} onChange={(e) => onChangeSearchInput(e)}></input>
                <button type='submit'>Buscar</button>
            </form>
            {searchedBooks.length !== 0 && <Pagination actualPage={searchPage} onClick={setSearchPage} />}
            <div className='contenedor-libros'>
                {searchedBooks.slice((searchPage - 1) * 10, 10 * searchPage).map(book => <Book book={book}></Book>)}
            </div>
        </>
    )
}
export default SearchPage