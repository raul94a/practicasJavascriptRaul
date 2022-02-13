import React from 'react'
import './Input.css'
const Input = ({ placeHolder, className, onChangeHandler, value, active, onFocusHandler }) => {
    if(!active) return <React.Fragment></React.Fragment>

    return (
    <input type="text" placeholder={placeHolder} className={className} onChange={onChangeHandler} value={value} onFocus={onFocusHandler}></input>
    )
}
export default Input