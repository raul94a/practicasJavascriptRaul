const SelectCategory = ({ selectHandler, value }) => {
    return (
        <select value={value}  onChange={(event) => selectHandler(event.target.value)}>
            <option value='Deporte'>Deporte</option>
            <option value='Comida'>Comida</option>
            <option value='Javascript'>Javascript</option>
            <option value='Politica'>Politica</option>
            <option value='Dart/Flutter'>Dart/Flutter</option>
            <option value='Vacaciones'>Vacaciones</option>
        </select>
    )
}
export default SelectCategory