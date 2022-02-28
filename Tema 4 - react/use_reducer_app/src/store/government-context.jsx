import React from 'react'



const GovernmentContext = React.createContext({
    ministers: [],
    addMinister : ()=>{},
    removeMinister: ()=> {}
}); 


export default GovernmentContext