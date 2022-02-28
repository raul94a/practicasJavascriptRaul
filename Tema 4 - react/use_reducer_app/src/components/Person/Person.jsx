import './Person.css'

const Person = (props) => {
    return (
        <div className='flex-row-between'>
            <div className='image-container'><img src={props.image} alt={`Imagen de ${props.name}`} /></div>
            <div className='flex-column-evenly'>
                <p><strong>Nombre: </strong>{props.name}</p>
                <p><strong>Puesto: </strong>{props.position}</p>
                <p><strong>Edad: </strong>{props.age}</p>
            </div>
            <button onClick={props.onAdd.bind(null, {
                 id: props.id,
                 name: props.name,
                 age: props.age,
                 image: props.image,
                 position: props.position
            })}>Añadir</button>
            <button onClick={props.onRemove.bind(null, props.id)}>Eliminar</button>
        </div>
    )
}
export default Person

