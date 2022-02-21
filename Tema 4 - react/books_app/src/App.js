
import './App.css';
import Header from './components/header/Header'
import React, { useState, useEffect } from 'react';
import HttpRequest from './services/HttpRequest'
import BookFromGoogle from './models/BookFromGoogle';
import FirebaseBook from './models/FirebaseBook';
import { LoadingModal } from './components/modal/BookModal'
import BookContext from './state/book-context';
import SearchPage from './components/pages/SearchPage';
import UserBooksPage from './components/pages/UserBooksPage';

function App() {
  const [page, setPage] = useState(3)
  const [isLoadingActive, setIsLoadingActive] = useState(true)
  //estado de los libros guardados por el usuario
  const [userBooks, setUserBooks] = useState([]);

  const addBook = (book, fromSearch = true) => {

    if (!fromSearch) {
      setUserBooks([...userBooks]);
      return;
    }
    setUserBooks(prev => [...prev, book])
    console.log(userBooks, userBooks.length)
  }



  const onSetPage = (ev) => {
    //data-nav
    let dataNav = ev.target.dataset.nav
    console.log('click', dataNav)
    setPage(dataNav)
    console.log(page)
  }

  useEffect(async() => {
    let response = await HttpRequest.httpGet(true)
    let arrayBooks = [];
    setTimeout(async () => {
     
      for (let book in response) {
        let selfLink = response[book]['selfLink']
        let firebaseBook = FirebaseBook.createBookFromFirebase(response[book]);
        let googleBook = new BookFromGoogle(await HttpRequest.httpGetBook(selfLink));
        googleBook.addFirebaseData(firebaseBook)
        arrayBooks.push(googleBook)

      }

      setUserBooks([...arrayBooks])
      setIsLoadingActive(false);


    }, 2000)


  }, [])


  return (
    <BookContext.Provider value={{ userBooks: userBooks, addBook: addBook }}>
      {isLoadingActive && <LoadingModal />}
      <>

        <Header onSetPage={onSetPage} />
        <div className='contenedor-principal'>
          {page == 1 && <UserBooksPage showReadBooks={false} />}
          {page == 2 && <UserBooksPage showReadBooks={true} />}
          {page == 3 && <SearchPage />}
        </div>
      </>
    </BookContext.Provider>
  );
}

export default App;
