import './AddForm.css'

const AddForm = ({ children, className }) => {
    return (
        <form className={`add-form ${className}`}>
            {/* <input type="text" placeholder="Título" className="add-form-input-titulo" onChange={onChangeTitulo}></input>
            <input type="text" placeholder='Añade una nota...' className="add-form-input-añadir" onChange={onChangeHandler} value={value}></input>
            <button onClick={onClickButton}>Click</button> */}
            {children}
        </form>
    )
}
export default AddForm