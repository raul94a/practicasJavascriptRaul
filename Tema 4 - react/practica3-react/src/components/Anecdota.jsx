import React from "react"
const Anecdota = ({anecdota, votos}) => {
    return(<div className="anecdota">
        <p>{anecdota}</p>
        <div><p>Tiene {votos} votos.</p></div>
    </div>)
}
export default Anecdota