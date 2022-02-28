import React from "react";



const BookContext = React.createContext({
    userBooks: [],
    localId: '',
    isLoadingActive: false,
    isLoggedIn: false,
    setLocalId: ()=>{},
    setIsLoadingActive: ()=>{},
    addBook:()=>{},
    setUserBooks: ()=>{},
    changeLogStatus: ()=>{},
})


const BookContextProvider = (props) => {
    
    return (<BookContext.Provider>{props.children}</BookContext.Provider>)
}


export default {BookContext, BookContextProvider}