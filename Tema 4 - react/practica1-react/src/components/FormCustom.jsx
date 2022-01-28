import { useState } from 'react';
import InputCustom from './InputCustom';
import Caja from './Caja'

const FormCustom = () => {
    let formValue = '';
    const [inputValue, setInputValue] = useState('hola')
    const onInputChange = value => {
      
        setInputValue(value);
    }
    return (<div>

        <InputCustom onInputChange={onInputChange} value={inputValue}/>
        <Caja value={inputValue}></Caja>
    </div>)
}
export default FormCustom