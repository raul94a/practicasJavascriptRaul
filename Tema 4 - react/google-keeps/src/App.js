import { useState } from 'react';
import './App.css';
import AddForm from './components/form/AddForm';
import FormActions from './components/form/FormActions';
import Input from './components/form/Input';
import MainHeader from './components/header/MainHeader';
import NotasSection from './components/nota/NotasSection'


function App() {
  const mock = [
    {
      id: Math.random(),
      title: 'Test 1',
      content: 'Probando test 1',
      color: 'white',
      className: 'nota-div'
    },
    {
      id: Math.random(),
      title: 'Test 2',
      content:  'Probando test 2',
      color: 'white',
      className: 'nota-div'
    },
    {
      id: Math.random(),
      title: 'Test 3',
      content: 'Probando test 3',
      color: 'white',
      className: 'nota-div'
    },
    {
      id: Math.random(),
      title: 'Test 4',
      content: 'Probando test 4',
      color: 'white',
      className: 'nota-div'
    }
  ]
  const [inputNotaValue, setInputNotaValue] = useState('')
  const [inputTituloValue, setInputTituloValue] = useState('')
  const [activeForm, setActiveForm] = useState(false)
  const [notas, setNotas] = useState([...mock]);
  const [pickColor, setPickColor] = useState(false);
  const [color, setColor] = useState('white')


  const onPickColor = e => {
    setColor(e.target.classList[0]);
    onHideColorPicker()

  }

  const onClickColorPicker = () => {
    setPickColor(!pickColor)
  }

  const onHideColorPicker = () => setPickColor(false)

  const onChangeInputHandler = (event) => {
    setInputNotaValue(event.target.value);

  }
  const onChangeTituloHandler = (event) => {
    setInputTituloValue(event.target.value);
  }

  const onFocusHandler = () => {
    setActiveForm(true)
  }
  const onClickAppBody = (event) => {

    if (event.target.className.includes('app-body')) {
      setActiveForm(false)
      onHideColorPicker()
    }
  }

  const onClickButton = event => {
    event.preventDefault();
    const nota = {
      id: Math.random(),
      title: inputTituloValue,
      content: inputNotaValue,
      color: color,
      className: 'nota-div'
    }
    setNotas(previous => [...previous, nota]);
    setColor('white');
    setInputNotaValue('');
    setInputTituloValue('')
    console.log(notas);

  }

  const onChangeColor = (event) => {
    let color = event.target.classList[0];
    let id = event.target.closest('.nota-div').id;
    let nota = notas.filter(nota => nota.id == id)[0];
    nota.color = color;
    setNotas((prev) => [...notas])
  }
  const notasFunctions = {
    onChangeInputHandler : onChangeInputHandler,
    onChangeTituloHandler: onChangeTituloHandler,
    onChangeColor: onChangeColor,
    setNotas: setNotas
  }
  return (
    <div className='app-body' onClick={(event) => onClickAppBody(event)}>
      <MainHeader />
      <AddForm >
        <Input placeHolder='Título' className='add-form-input-titulo' value={inputTituloValue} onChangeHandler={onChangeTituloHandler} active={activeForm} />
        <Input placeHolder='Añade una nota...' className='add-form-input-nota' value={inputNotaValue} onChangeHandler={onChangeInputHandler} active={true} onFocusHandler={onFocusHandler} />
        <FormActions active={activeForm} pickColor={onClickColorPicker}/>
        {pickColor && <section className="notas-options">
                {['white', 'blue', 'red', 'green', 'yellow', 'pink'].map(colour => <div className={`${colour} color-box`} onClick={(e)=>onPickColor(e)}></div>)}
            </section>}
        {activeForm && <button onClick={onClickButton}>Añadir nota</button>}
        
      </AddForm>
      <NotasSection notas={notas} notasFunctions={notasFunctions} />
    </div>
  );
}

export default App;
