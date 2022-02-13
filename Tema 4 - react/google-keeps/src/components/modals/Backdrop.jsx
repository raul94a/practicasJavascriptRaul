import React from 'react'
import ReactDOM from 'react-dom'
import './Backdrop.css'
const Backdrop = ({ onHideBackdrop, active }) => {
    console.log(active)
    if (!active) return (<></>)
    return (ReactDOM.createPortal(<div className={active && 'backdrop-active'} onClick={onHideBackdrop}></div>, document.getElementById('backdrop')))
}
export default Backdrop