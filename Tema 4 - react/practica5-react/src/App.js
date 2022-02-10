import './App.css';
import { useState } from 'react';
import Form from './components/form/Form';
import Input from './components/form/Input';

function App() {
  const [nombre, setNombre] = useState('')
  const [numero, setNumero] = useState('');
  const [searchedNumber, setSearchedNumber] = useState('')
  const [registros, setRegistros] = useState([]);

  const onChangeNombreHandler = (event) => {
    setNombre(event.target.value)

    console.log(nombre)
  }
  const onChangeNumeroHandler = (event) => {
    setNumero(event.target.value)


  }

  const clearForm = () => {
    setNombre('')
    setNumero('')
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const persona = { nombre: nombre, numero: numero }
    setRegistros(previous => [...previous, persona])
    clearForm();
  }


  return (
    <>
      <div>
        <input onChange={(event) => {
          setSearchedNumber(event.target.value)
          console.log(searchedNumber)

        }}></input>



      </div>
      <Form>
        <Input type="text" value={nombre} inputHandler={onChangeNombreHandler} />
        <Input type="text" value={numero} inputHandler={onChangeNumeroHandler} />
        <button onClick={(event) => onSubmitHandler(event)}>Click</button>
      </Form>
      <h2>Agenda</h2>
      <div>
        {registros.filter(reg => reg.numero === searchedNumber).map(registro => <div className="">{registro.nombre}: {registro.numero}</div>)}

      </div>
    </>
  );
}

export default App;
