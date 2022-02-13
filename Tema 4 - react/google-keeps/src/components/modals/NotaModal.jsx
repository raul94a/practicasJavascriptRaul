import React from "react";
import ReactDOM from "react-dom";
import AddForm from '../form/AddForm';
import FormActions from '../form/FormActions';
import Input from '../form/Input';
import './NotaModal.css'
import { useState } from "react";



const OverlayModal = ({nota, notas, onSetNotas, onHideBackdrop}) => {
    const [modTituloValue, setModTituloValue] = useState(nota.title)
    const[modContentValue, setModContentValue] = useState(nota.content)

    const onChangeModTituloValue = event => {
        setModTituloValue(event.target.value)
    }
    const onChangeModContentValue = event => {
        setModContentValue(event.target.value)
    }

    const onClickButton = (e) => {
        e.preventDefault();
        const id = nota.id;
        console.log(id)
        let not = notas.filter(n => n.id === id)[0];
        console.log(not)
        not.title = modTituloValue;
        not.content= modContentValue;
        console.log(notas)
        onSetNotas(previous=> [...notas]);
        onHideBackdrop(e)

    }
    return (<AddForm >
        <Input placeHolder='Título' className='add-form-input-titulo' value={modTituloValue} onChangeHandler={(e)=>onChangeModTituloValue(e)} active={true} />
        <Input placeHolder='Añade una nota...' className='add-form-input-nota' value={modContentValue} onChangeHandler={(e)=>onChangeModContentValue(e)} active={true}/>
        <FormActions active={true} />
        <button onClick={onClickButton}>Modificar nota</button>
      </AddForm>)
}

const NotaModal = ({onHideBackdrop, nota, notas,notasFunctions}) => {
    const {onChangeTituloHandler, onChangeInputHandler, onChangeColor, setNotas} = notasFunctions
    
    return(<>
    
    {ReactDOM.createPortal(<div className={'backdrop-active'} onClick={(e)=>onHideBackdrop(e)}></div>, document.getElementById('backdrop'))}
    {ReactDOM.createPortal(
    <OverlayModal  nota={nota} notas={notas} onSetNotas={setNotas} onHideBackdrop={(e)=>onHideBackdrop(e)}/>, document.getElementById('modal'))}
    </>)
}
export default NotaModal