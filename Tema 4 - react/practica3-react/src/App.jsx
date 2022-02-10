import React, { useState, useEffect } from "react";
import Anecdota from "./components/Anecdota";
const App = () => {
    let random = Math.floor(Math.random() * 5);
    const votacion = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 }
    let anecdotaMayorVotos = 0;

    const [aleatorio, setAleatorio] = useState(random);
    const [votacionState, setVotacion] = useState(votacion);
    const [mayorVotos, setAnecdotaMasVotada] = useState(anecdotaMayorVotos)
    const [post, setPost] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/posts').then(response => response.json()).then(data=> {
            console.log(data)
            return setPost(data);a

        }
        )
    }, []);

    const generarNuevoAleatorio = () => {
        setAleatorio(Math.floor(Math.random() * 5))
        console.log(post)

    }

    const actualizarVotacion = (numero) => {
        votacionState[numero] += 1
        setVotacion(() => ({ ...votacionState }))
        generarNuevoAleatorio()
        setAnecdotaMasVotada(Object.keys(votacionState).find(key => votacionState[key] == Math.max(...Object.values(votacionState))))
        console.log(mayorVotos)
    }


    const anecdotas = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the'
        + 'other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers' +
        'write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place.' +
        'Therefore, if you write the code as cleverly as possible, you are, by' +
        'definition, not smart enough to debug it.'
    ]



    return (<>
        <Anecdota anecdota={anecdotas[aleatorio]} votos={votacionState[aleatorio]} />
        <p >{anecdotas[mayorVotos]}</p>
        <button onClick={() => actualizarVotacion(aleatorio)}>Votar</button>
        <button onClick={generarNuevoAleatorio}>Siguiente</button>

    </>
    );
}

export default App