import { useState } from 'react';
import Backdrop from '../modals/Backdrop';
import NotaModal from '../modals/NotaModal';
import './Nota.css'

const Nota = ({ nota, clase, notasFunctions, notas }) => {
    const { color, content, title, id, category } = nota;
    const divClassName = color + ' ' + clase;

    const [activeState, setActiveState] = useState(false)
    const [activeModal, setActiveModal] = useState('');

    const onMouseOver = () => {
        setActiveState(true)
    }
    const onMouseLeave = () => {
        setActiveState(false)
    }
    const triggerModal = (event) => {
        if (event.target.className.includes('color-box')) return
        setActiveModal(true)
    }
    const hideModal = (event) => {
        setActiveModal(null);

    }
    return (
        <>
            {activeModal && <NotaModal onHideBackdrop={hideModal} notasFunctions={notasFunctions} nota={nota} notas={notas} />}
            <div onDragStart={(event) => {
                
                event.dataTransfer.setData('text/plain', nota.id);
                event.dataTransfer.effectAllowed = 'move';

            }} draggable='true' className={divClassName} onClick={(e) => triggerModal(e)} key={id} id={id} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
                <div className='flex-row-between'>
                    <h3>{title}</h3>
                    <h4>{category}</h4>
                </div>
                <p className="nota-content">{content}</p>
                {activeState && <section className="notas-options">
                    {['white', 'blue', 'red', 'green', 'yellow', 'pink'].map(colour => <div className={`${colour} color-box`} onClick={notasFunctions.onChangeColor}></div>)}
                </section>}

            </div>
        </>

    )
}
export default Nota