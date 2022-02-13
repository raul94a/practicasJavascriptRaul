import './NotasSection.css'
import  Nota from './Nota'
const NotasSection = ({ notas, onChangeColor }) => {
    
    return (<section className='notas-section'>
        {notas.map(nota => <Nota color={nota.color} content={nota.content} titulo={nota.title} id={nota.id} onChangeColor={onChangeColor} clase={nota.className} />)}
    </section>)
}
export default NotasSection