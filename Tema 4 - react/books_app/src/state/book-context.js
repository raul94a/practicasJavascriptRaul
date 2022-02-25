import React from "react";



const BookContext = React.createContext({
    userBooks: [],
    localId: '',
    setLocalId: ()=>{}
    
  
})

export default BookContext