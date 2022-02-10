const Part = ({name, exercises,id}) => {
    return(<>
    <p>ID: {id}</p>
    <p>{name}</p>
    <p>Number of exercises: {exercises}</p>
    </>)
}
export default Part