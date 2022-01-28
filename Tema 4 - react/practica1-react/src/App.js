
import './App.css';
import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';
import FormCustom from './components/FormCustom';

const course = 'Half Stack application development';
const part1 = 'Fundamentals of React';
const exercises1 = 10
const part2 = 'Using props to pass data'
const exercises2 = 7
const part3 = 'State of a component'
const exercises3 = 14
const suma = exercises1 + exercises2 + exercises3
const contentInfo = {
  name: course,
  parts: [
    {
      part: part1,
      exercises: exercises1
    },
    {
      part: part2,
      exercies: exercises2
    },
    {
      part: part3,
      exercises: exercises3
    }
  ],
  total: suma
};

function App() {
  return (
  
      <div>
        <Header course={contentInfo.name} />
        <Content parts={contentInfo.parts} />
        <Total suma={contentInfo.total} />
        <FormCustom />
      </div>
  
  );
}

export default App;

