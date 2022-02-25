
import { useState, useEffect } from 'react';
import './App.css';
import AddForm from './components/form/AddForm';
import FormActions from './components/form/FormActions';
import Input from './components/form/Input';
import SelectCategory from './components/form/SelectCategory';
import MainHeader from './components/header/MainHeader';
import NotasSection from './components/nota/NotasSection'
import NotasService from '../src/services/NotasService'
let svgStyle = { width: '200px', height: '200px', marginTop: '5%' }

function App() {
  // const mock = [
  //   {
  //     id: Math.random(),
  //     title: 'Test 1',
  //     content: 'Probando test 1',
  //     category: 'Politica',
  //     color: 'blue',
  //     className: 'nota-div'
  //   },
  //   {
  //     id: Math.random(),
  //     title: 'Test 2',
  //     content: 'Probando test 2',
  //     color: 'pink',
  //     category: 'Deporte',
  //     className: 'nota-div'
  //   },
  //   {
  //     id: Math.random(),
  //     title: 'Test 3',
  //     content: 'Probando test 3',
  //     color: 'yellow',
  //     category: 'Java',
  //     className: 'nota-div'
  //   },
  //   {
  //     category: 'Dart/Flutter',
  //     id: Math.random(),
  //     title: 'Test 4',
  //     content: 'Probando test 4',
  //     color: 'red',
  //     className: 'nota-div'
  //   }
  // ]
  const [inputNotaValue, setInputNotaValue] = useState('')
  const [inputTituloValue, setInputTituloValue] = useState('')
  const [categoryValue, setCategoryValue] = useState('Deporte');
  const [activeForm, setActiveForm] = useState(false)
  const [inputFilter, setInputFilter] = useState('');
  const [inputFilterWithDebouce, setInputFilterWithDebouce] = useState('')
  const [showFilteredData, setShowFilteredData] = useState(false);
  const [dragOver, setDragOver] = useState(false)

  const onChangeFilterHandler = (ev) => {
    setInputFilter(ev.target.value);
    setShowFilteredData(ev.target.value !== '' ? true : false);
  }
  const [notas, setNotas] = useState([]);
  const [pickColor, setPickColor] = useState(false);
  const [color, setColor] = useState('white')

  useEffect(() => {
    //vamos a realizar una petición http para recargar las notas de nuestro servidor
    setTimeout(async () => {
      let response = await fetch('https://booksapp-7847c-default-rtdb.europe-west1.firebasedatabase.app/notas.json').then(async res => {
        return await res.json()
        
      }, 250);
      console.log(response)
      setNotas(response);
    })
  }, [])


  //debounce de la búsqueda
  useEffect(() => {
    const timer = setTimeout(() => {
      setInputFilterWithDebouce(inputFilter)
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [inputFilter])




  const onSetNotas = (nota) => {
    setNotas(prev => [...prev, nota]);
  }

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

    if (event.target.className.includes('notas-container')) {
      setActiveForm(false)
      onHideColorPicker()
    }
  }

  const onClickButton = event => {
    event.preventDefault();
    let nota = {
      id: Math.random(),
      title: inputTituloValue,
      category: categoryValue,
      content: inputNotaValue,
      color: color,
      className: 'nota-div'
    }
    onSetNotas(nota);
    setColor('white');
    setInputNotaValue('');
    setInputTituloValue('')

    setTimeout(async () => {
      await fetch('https://booksapp-7847c-default-rtdb.europe-west1.firebasedatabase.app/notas.json', {
        method: 'PUT',
        body: JSON.stringify(notas)
      })


    }, 2000)
  }
  //Vladimir se ha encerrado en su despacho. La fecha es palindromica y eso el no lo soporta. Tengo que recordarle que acuda a sus clases de yoga para que consiga relajarse

  const onChangeColor = (event) => {
    let color = event.target.classList[0];
    let id = event.target.closest('.nota-div').id;
    let nota = notas.filter(nota => nota.id == id)[0];
    nota.color = color;
    setNotas((prev) => [...notas])
  }
  const notasFunctions = {
    onChangeInputHandler: onChangeInputHandler,
    onChangeTituloHandler: onChangeTituloHandler,
    onChangeColor: onChangeColor,
    setNotas: setNotas
  }


  const searchHandler = (nota, string) => {
    if (searchContainsCategoryFilter(string)) {
      let category = extractCategory(string);
      let str = extractFilterString(string);
      return nota.category.toLowerCase() === category.toLowerCase() && (
        nota.content.toLowerCase().includes(str)
        || nota.title.toLowerCase().includes(str)
      )
    }
    return nota.category.toLowerCase().includes(string)
      || nota.content.toLowerCase().includes(string)
      || nota.title.toLowerCase().includes(string);
  }

  const searchContainsCategoryFilter = (string) => {
    return string.includes('#')
  }

  const extractCategory = (string) => {
    return string.split('#')[1];
  }
  const extractFilterString = (string) => {
    let str = string.split('#')[0]
    return str.substring(0, str.length - 1);
  }

  const onDragOver = event => {
    event.preventDefault()
    setDragOver(true)
  }
  const onDrop = event => {
    let id = event.dataTransfer.getData('text/plain');
    console.log(`Dropping element ${id}`)
    setNotas(prv => [...notas.filter(nota => nota.id != id)]);
    setDragOver(false)
    console.log(notas);

  }


  return (
    <div className='app-body' onClick={(event) => onClickAppBody(event)} onDrop={(e) => onDrop(e)}>
      <MainHeader />
      <div className='flex-row'>
        <div className='notas-container'>
          <AddForm >
            <div className='flex-row-between'>
              <Input placeHolder='Título' className='add-form-input-titulo' value={inputTituloValue} onChangeHandler={onChangeTituloHandler} active={activeForm} />
              {activeForm && <SelectCategory value={categoryValue} selectHandler={setCategoryValue}></SelectCategory>}
            </div>
            <Input placeHolder='Añade una nota...' className='add-form-input-nota' value={inputNotaValue} onChangeHandler={onChangeInputHandler} active={true} onFocusHandler={onFocusHandler} />
            <FormActions active={activeForm} pickColor={onClickColorPicker} />
            {pickColor && <section className="notas-options">
              {['white', 'blue', 'red', 'green', 'yellow', 'pink'].map(colour => <div className={`${colour} color-box`} onClick={(e) => onPickColor(e)}></div>)}
            </section>}
            {activeForm && <button onClick={onClickButton} >Añadir nota</button>}

          </AddForm>
          <NotasSection notas={showFilteredData ? notas.filter(nota => searchHandler(nota, inputFilterWithDebouce.toLowerCase())) : notas} notasFunctions={notasFunctions} />
        </div>
        <div className='flex-column '>
          <AddForm className='search-form'>
            <Input placeHolder='Busca las notas...' className='add-form-input-titulo' value={inputFilter} onChangeHandler={onChangeFilterHandler} active={true} />
          </AddForm>

          <div onDragOver={(e) => onDragOver(e)} onDrop={(event) => onDrop(event)} style={svgStyle} onDragLeave={(e) => {
            e.prenvetDefault();
            setDragOver(false)
          }}>
            {dragOver
              ?
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="200px" height="200px"><path d="M19.994,4.11C20.06,3.518,19.596,3,19,3H5C4.404,3,3.94,3.518,4.006,4.11L5.55,18H18.45L19.994,4.11z" opacity=".35" /><path d="M8.568,21h6.864c1.529,0,2.813-1.149,2.982-2.669L18.45,18H5.55l0.037,0.331C5.755,19.851,7.039,21,8.568,21z" /><path d="M8.547,15.095l-1.019-2.039c-0.315-0.631-0.192-1.392,0.307-1.891l2.562-2.562c0.312-0.312,0.832-0.261,1.077,0.107	l1.059,1.589C12.825,10.737,13.316,11,13.842,11h1.85c0.559,0,0.892,0.623,0.582,1.088l-1.094,1.641	C15.063,13.906,15,14.113,15,14.326V15.3c0,0.386-0.313,0.7-0.7,0.7h-4.288C9.392,16,8.825,15.649,8.547,15.095z M12.883,7.325	l0.697,1.046C13.843,8.764,14.284,9,14.756,9h1.036c0.381,0,0.707-0.272,0.776-0.646l0.207-1.125C16.892,6.589,16.401,6,15.751,6	h-2.159C12.912,6,12.506,6.759,12.883,7.325z" /></svg>
              : <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="200px" height="200px"><path d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z" /></svg>

            }
          </div>
        </div>

      </div>
    </div>

  );
}

export default App;
