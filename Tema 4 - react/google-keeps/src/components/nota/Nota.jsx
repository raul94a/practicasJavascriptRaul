import { useState } from 'react';
import Backdrop from '../modals/Backdrop';
import NotaModal from '../modals/NotaModal';
import './Nota.css'

const Nota = ({ color, content, id, onChangeColor, clase, titulo }) => {
    const divClassName = color + ' ' + clase;

    const [activeState, setActiveState] = useState(false)
    const [activeModal, setActiveModal] = useState(false);

    const onMouseOver = () => {
        setActiveState(true)
    }
    const onMouseLeave = ()  => {
        setActiveState(false)
    }
    const triggerModal = () => {
        setActiveModal(true)
    }
    const hideModal = () => {
        setActiveModal(null);
        console.log(activeModal)
    }
    return (
        <div className={divClassName} onClick={triggerModal} key={id} id={id} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
            <h3>{titulo}</h3>
            <p className="nota-content">{content}</p>
            { activeState ? <section className="notas-options">
                {['white', 'blue', 'red', 'green', 'yellow', 'pink'].map(colour => <div className={`${colour} color-box`} onClick={onChangeColor}></div>)}
            </section> : <></>}
            {activeModal && <NotaModal/>}
            {  <Backdrop active={activeModal} onHideBackdrop={hideModal}/>}
            
        </div>
    )
}
export default Nota