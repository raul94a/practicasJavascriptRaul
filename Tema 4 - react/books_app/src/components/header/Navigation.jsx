import './Navigation.css'
const Navigation = ({ onClick, page }) => {
    //Navigation will have three elements...
    console.log(page)
    return (
        <nav>
            <button data-nav='1' style={{ backgroundColor: page == 1 ? 'lightblue' : 'white' }} onClick={(event) => onClick(event)} >Libros pendientes</button>
            <button data-nav='2' style={{ backgroundColor: page == 2 ? 'lightblue' : 'white' }} onClick={(event) => onClick(event)} >Libros leídos</button>
            <button data-nav='3' style={{ backgroundColor: page == 3 ? 'lightblue' : 'white' }} onClick={(event) => onClick(event)} >Búsqueda de libros</button>
        </nav>
    )
}
export default Navigation