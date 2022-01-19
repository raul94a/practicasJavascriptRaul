import Part from './Part'
const Content = ({ parts }) => {
    

    const partsElements = parts.map(part => <Part data={part}></Part>)
    return (
        <>
            {partsElements}
        </>
    );
}

export default Content;