import { useEffect, useState } from "react";



const ModalDescription = ({ description }) => {
    const [columnCount,setColumnCount] = useState(0);
    const [screenWidthState, setScreenWidthState] = useState(document.documentElement.offsetWidth)

    useEffect(()=>{
        function resize(){
            setScreenWidthState(document.documentElement.offsetWidth)
            console.log(screenWidthState)
        }
        setColumnCount(screenWidthState> 1250 ? 2 : 1);
        window.addEventListener('resize',resize)
        return _ => {
      window.removeEventListener('resize', resize)
    }
    },[])
    
    
    return (
        <>
            <h1 className="extra-card-description">Descripción</h1>
            <p style={{columnCount:columnCount}}>{description}</p>
        </>
    )
}
export default ModalDescription