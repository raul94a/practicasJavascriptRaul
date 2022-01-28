import './Form.css'
const Form = ({value, onChangeHandler, onSubmitHandler}) => {
    return (
        <>
            <form onSubmit={(event) => onSubmitHandler(event)}>
                <label>Introduce el texto</label>
                <input value={value['texto']} type='' name="texto" maxLength='50' onChange={(event)=>onChangeHandler(event)}></input>
                <label>Edad</label>
                <input value={value['edad']} type=''  name="edad" maxLength='50' onChange={(event)=>onChangeHandler(event)}></input>
                <label>email</label>
                <input value={value['email']} type='' name="email"  maxLength='50' onChange={(event)=>onChangeHandler(event)}></input>
                <label>apellido</label>
                <input value={value['apellido']} type='' name="apellido"  maxLength='50' onChange={(event)=>onChangeHandler(event)}></input>
                <label>direccion</label>
                <input value={value['direccion']} type='' name="direccion"  maxLength='50' onChange={(event)=>onChangeHandler(event)}></input>
                <button >Enviar</button>
            </form>

        </>
    )
}
export default Form