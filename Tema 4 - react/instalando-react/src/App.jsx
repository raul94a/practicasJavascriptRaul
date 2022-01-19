import './App.css';
import Card from './components/Card';


function App() {
  return (
    <div className="App">
      <h1>Hello world from reactjs</h1>
      <Card src="https://pbs.twimg.com/profile_images/511333573119320064/3q1981fx_400x400.jpeg" alt="Foto de usuario que no existe" nombre="Raul" apellido="Albin"></Card>
      
    </div>
  );
}

export default App;
