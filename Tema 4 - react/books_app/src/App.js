
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
import Login from './components/login/Login';
import Footer from './components/footer/Footer';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [page, setPage] = useState(3)
  const [localId, setLocalId] = useState('')
  const [isLoadingActive, setIsLoadingActive] = useState(true)
  //estado de los libros guardados por el usuario
  const [userBooks, setUserBooks] = useState([]);
  const [height, setHeight] = useState(document.documentElement.clientHeight)

  const onSetLocalId = localId =>{
    setLocalId(localId);
  }

  const addBook = (book, fromSearch = true) => {

    if (!fromSearch) {
      setUserBooks([...userBooks]);
      return;
    }
    setUserBooks(prev => [...prev, book])
    console.log(userBooks, userBooks.length)
  }

  const changeLogStatus = () => setIsLoggedIn(!isLoggedIn);

  const onSetPage = (ev) => {
    //data-nav
    let dataNav = ev.target.dataset.nav
    console.log('click', dataNav)
    setPage(dataNav)

    console.log(page)
  }
  // let height = document.documentElement.offsetHeight;
  // if(height === 0){
    
  // }
  return (
    <BookContext.Provider value={{
      userBooks: userBooks,
      isLoadingActive: isLoadingActive,
      isLoggedIn: isLoggedIn,
      localId: localId,
      setIsLoadingActive: setIsLoadingActive,
      addBook: addBook,
      setUserBooks: setUserBooks,
      changeLogStatus: changeLogStatus,
      setLocalId: onSetLocalId,
      
    }}>

        {isLoggedIn && isLoadingActive && <LoadingModal />}
      <>
        {!isLoggedIn && <Login />}


        {isLoggedIn &&
          <>
            <Header onSetPage={onSetPage} page={page} />
            <div className='contenedor-principal'>
              {page == 1 && <UserBooksPage showReadBooks={false} setHeight={setHeight} />}
              {page == 2 && <UserBooksPage showReadBooks={true} setHeight={setHeight}/>}
              {page == 3 && <SearchPage setHeight={setHeight}/>}
            </div>
          </>}
          {isLoggedIn && !isLoadingActive && <Footer height={height}/>}
      </>
    </BookContext.Provider>
  );
}

export default App;
