
import './App.css';
import Header from './components/header/Header'
import { useState } from 'react';
import HttpRequest from './services/HttpRequest'
import BookFromGoogle from './models/BookFromGoogle';
import Book  from './components/books/Book';

function App() {
  const [page, setPage] = useState(3)
  const [searchInput, setSearchInput] = useState('');
  const [searchedBooks, setSearchedBooks] = useState([]);

  const onChangeSearchInput = (event) => {
    setSearchInput(event.target.value);
  }

  const onSubmitSearch = async (event) => {
    event.preventDefault();
    //aquí sería un buen momento para realizar una petición a la base de datos...
    let booksFromGoogle = []
    let search =  await HttpRequest.httpGet(false, searchInput);
    let items = search['items']
    for(let book of items){
      booksFromGoogle.push(new BookFromGoogle(book));
    };
    setSearchedBooks(prevState=> [...booksFromGoogle]);
    

  }


  const onSetPage = (ev) => {
    //data-nav
    let dataNav = ev.target.dataset.nav
    setPage(dataNav)
  }

  return (
    <>
      <Header onSetPage={onSetPage} />
      <div className='contenedor-principal'>
        {
          //aqui iría el código de la primera página
          page == 1 && <p>Pagina Uno</p>

        }
        {page == 2 && <p>Pagina Dos</p>}

        {
          //página de búsqueda
          page == 3 &&
          <div>
            <form onSubmit={(e)=>onSubmitSearch(e)}>
              <input type="text" placeholder="Introduce libro o autor..." value={searchInput} onChange={(e)=>onChangeSearchInput(e)}></input>
              <button type='submit'>Buscar</button>
            </form>
            <div className='contenedor-libros'>
              {searchedBooks.map(book => <Book book={book}></Book>)}
            </div>
          </div>
        }
      </div>
    </>
  );
}

export default App;
