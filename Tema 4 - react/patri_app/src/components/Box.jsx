import './Box.css'
const Box = ({value}) => {
    let length = value.length;
    let restante = 50 - length
    let string = []
    for(let a in value){
        string.push(<p>{`${a}: ` + value[a] + '\n'}</p>)
    }
    return(<p>{string}</p>)
}
export default Box