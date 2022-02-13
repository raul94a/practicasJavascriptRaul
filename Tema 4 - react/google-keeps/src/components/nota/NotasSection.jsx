import './NotasSection.css'
import  Nota from './Nota'
const NotasSection = ({ notas, notasFunctions }) => {
    
    return (<section className='notas-section'>
        {notas.map(nota => <Nota  nota={nota}  notasFunctions={notasFunctions} clase={nota.className} notas={notas}/>)}
    </section>)
}
export default NotasSection