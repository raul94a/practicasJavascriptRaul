import Part from './Part';
const Content = ({ parts }) => {
    const courseParts = parts.map(parte => <Part name={parte.name} exercises={parte.exercises} id={parte.id}></Part>)
    // console.log(parts)
    let suma = 0;
    parts.forEach(element => {
        suma += element.exercises
    });
    return (<>
        {courseParts}
        <p>Total: {suma}</p>
    </>)
}
export default Content