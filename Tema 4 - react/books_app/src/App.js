
import './App.css';
import Header from './components/header/Header'
import React, { useState, useEffect } from 'react';
import HttpRequest from './services/HttpRequest'
import BookFromGoogle from './models/BookFromGoogle';
import Book from './components/books/Book';
import Pagination from './components/UI/Pagination';
import FirebaseBook from './models/FirebaseBook';
import {LoadingModal} from './components/modal/BookModal'
function App() {
  const [page, setPage] = useState(3)
  const [searchInput, setSearchInput] = useState('');
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [searchPage, setSearchPage] = useState(1);
  const [isLoadingActive, setIsLoadingActive] = useState(true)
  //estado de los libros guardados por el usuario
  const [userBooks, setUserBooks] = useState([]);


  const addBook = (book, fromSearch = true) => {
    // if(typeof book !== FirebaseBook) return;
    if(!fromSearch){
      setUserBooks([...userBooks]);
      return;
    }
    setUserBooks(prev => [...prev, book])
    console.log(userBooks, userBooks.length)
  }





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


  }


  const onSetPage = (ev) => {
    //data-nav
    let dataNav = ev.target.dataset.nav
    setPage(dataNav)
  }

  useEffect(async()=>{
    let response = await HttpRequest.httpGet(true)
    let arrayBooks = [];
    setTimeout(async ()=>{
      for(let book in response){
        let selfLink  = response[book]['selfLink']
        let firebaseBook = FirebaseBook.createBookFromFirebase(response[book]);
        let googleBook = new BookFromGoogle(await HttpRequest.httpGetBook(selfLink));
        googleBook.addFirebaseData(firebaseBook)
        arrayBooks.push(googleBook)
      
      }
      setUserBooks([...arrayBooks])
      setIsLoadingActive(false);


    },2000)
  

  },[])


  return (
    <React.Fragment>
    {isLoadingActive && <LoadingModal/>}
    <>
      
      <Header onSetPage={onSetPage} />
      <div className='contenedor-principal'>
        {
          //aqui iríael código de la primera página
          <div className='contenedor-libros'>
            {page == 1 && userBooks.filter(book => !book.read).map(book => <Book book={book} userBooks={userBooks} addBook={addBook} fromSearch={false}></Book>)}
          </div>
        }
        <div className='contenedor-libros'>
          {page == 2 && userBooks.filter(book => book.read).map(book => <Book book={book} userBooks={userBooks} addBook={addBook} fromSearch={false}></Book>)}
        </div>

        {
          //página de búsqueda
          page == 3 &&
          <div>
            <form onSubmit={(e) => onSubmitSearch(e)}>
              <input type="text" placeholder="Introduce libro o autor..." value={searchInput} onChange={(e) => onChangeSearchInput(e)}></input>
              <button type='submit'>Buscar</button>
            </form>
            {searchedBooks.length !== 0 && <Pagination actualPage={searchPage} onClick={setSearchPage} />}
            <div className='contenedor-libros'>
              {searchedBooks.slice((searchPage - 1) * 10, 10 * searchPage).map(book => <Book book={book} userBooks={userBooks} addBook={addBook}></Book>)}
            </div>
          </div>
        }
      </div>
    </>
    </React.Fragment>
  );
}

export default App;
