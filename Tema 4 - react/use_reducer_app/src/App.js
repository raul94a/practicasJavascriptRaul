import './App.css';
import Person from './components/Person/Person';
import { useContext } from 'react';
import GovernmentContext from './store/government-context';

const data = [{
  id: 1,
  name: 'Pedro Sanchez',
  age: 48,
  image: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Pedro_S%C3%A1nchez_2021b_%28portrait%29.jpg',
  position: 'Prime Minister'
},{
  id: 2,
  name: 'Pablo Casado',
  age: 40,
  image: 'https://estaticos-cdn.epe.es/clip/b7c26460-7c1a-4b62-be29-401907bb7b45_alta-libre-aspect-ratio_default_0.jpg',
  position: 'Head of Popular Party'
},{
  id: 3,
  name: 'Yolanda Díaz',
  age: 57,
  image: 'https://s.libertaddigital.com/2022/02/23/1920/1080/fit/yolanda-diaz.jpg',
  position: 'Job Minister'
},{
  id: 4,
  name: 'Vladimir Putin',
  age: 69,
  image: 'https://static.dw.com/image/60894120_401.jpg',
  position: 'World Conqueror'
}]



function App() {
  const ctx = useContext(GovernmentContext)
  console.log(ctx);
  const persons = data.map(person => <Person {...person} onAdd={ctx.addMinister} onRemove={ctx.removeMinister}></Person>)
  return (
  <>
    <div className='lista'>
      {persons}
    </div>
    <div className='Gobierno'>
      {ctx.ministers.map(m => <p style={{fontSize:'20px'}}>{m.name}</p>)}
    </div>
  </>
  );
}

export default App;
