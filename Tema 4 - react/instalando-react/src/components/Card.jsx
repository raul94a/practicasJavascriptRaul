import './styles/Card.css';
function Nombre (props){
  
  return <p>{props.hola} {props.nombre} {props.apellido}</p>
}

function Card({src, alt, nombre, apellido}){
    return (
      <div className="card-container" >
          <img src={src} alt={alt}></img>
          <Nombre nombre={nombre} apellido={apellido}></Nombre>
      </div>
       
    )
}

export default Card;