import './Input.css'
const Input = ({type, value, inputHandler}) => {
    return(<input type={type} value={value} onChange={inputHandler}></input>)
}
export default Input