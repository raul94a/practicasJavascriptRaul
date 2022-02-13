import React from "react";
import ReactDOM from "react-dom";


const NotaModal = (props) => {
    return(<>
    
    {ReactDOM.createPortal(<>
        <p>Modal activado</p>
    </>, document.getElementById('modal'))}
    </>)
}
export default NotaModal