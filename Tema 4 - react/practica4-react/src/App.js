import './App.css';
import { useEffect,useState } from 'react';
import Content from './components/Content';
import Course from './components/Course';
import Header from './components/Header';

function App() {

  const courses = [{
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3,
      },
    ],
  },
  {
    "id": 2,
    "name": "Flutter development course",
    "parts": [
      {
        "name": "Fundamentals of Dart",
        "exercises": 120,
        "id": 4
      },
      {
        "name": "Using constructor to pass data",
        "exercises": 7,
        "id": 5
      },
      {
        "name": "Statefull Widgets",
        "exercises": 14,
        "id": 6
      }
    ]
  }];
  const [data, setData] = useState([])

  useEffect(()=>{
    fetch(' http://localhost:3000/courses')
    .then(async resp => setData(await resp.json()))
   
    
   
  },[])

  const pintar = data.map(curso => {
    return <Course>
      <Header name={curso.name}></Header>
      <Content parts={curso.parts}></Content>
    </Course>
  });
  return (
    <>
      {pintar}
    </>

  );
}

export default App;
