import { useState } from "react"
import Box from './Box'
import Form from "./Form"
import Message from "./Message"
const FormController = (props) => {
    
    const[inputs, setValue] = useState({})
    const [submittedValue, setSubmittedValue] = useState('')

    const inputHandler = (event) => {
        const name = event.target.name;
     
        const value = event.target.value;
        setValue(values => ({...inputs, [name]: value}))
    }

    const onSubmitHandler = event => {
        event.preventDefault();
        setSubmittedValue('');
    }

    return(
    <>
        <Box value={inputs}></Box>
        <Form value={inputs} onSubmitHandler={onSubmitHandler} onChangeHandler={inputHandler}></Form>
        <Message value={submittedValue}/>
    </>
    )
}
export default FormController