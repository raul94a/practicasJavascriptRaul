import './Navigation.css'
const Navigation = ({onClick}) => {
    //Navigation will have three elements...
    return(
    <nav>
        <button data-nav='1' onClick={(event)=>onClick(event)}>Libros pendientes</button>
        <button data-nav='2' onClick={(event)=>onClick(event)}>Libros leídos</button>
        <button data-nav='3' onClick={(event)=>onClick(event)}>Búsqueda de libros</button>
    </nav>
    )
}
export default Navigation