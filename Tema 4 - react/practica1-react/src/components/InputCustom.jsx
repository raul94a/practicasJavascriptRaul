const InputCustom = ({onInputChange,value}) => {
    return(<input value={value} onChange={(event) => onInputChange(event.target.value)}/>)
}
export default InputCustom