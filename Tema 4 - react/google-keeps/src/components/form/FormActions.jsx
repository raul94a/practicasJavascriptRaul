import './FormActions.css'
const FormActions = ({active}) => {
    if(!active) return <></>
    return(<section className="form-actions">
        <p>Color</p>
        <p>Cerrar</p>
    </section>)
}
export default FormActions