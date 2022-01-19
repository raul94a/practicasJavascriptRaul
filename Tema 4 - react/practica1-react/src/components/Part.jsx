const Part = (props) => {
    // console.log(props.data);
    const {part, exercises} = props.data;
    return (
        <p>
            {part} {exercises}
        </p>
    );
}



export default Part;