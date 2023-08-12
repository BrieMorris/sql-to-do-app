import {useState,  useEffect} from 'react';
import axios from 'axios';

let toDoData = [];

function App () {
  const [toDoList, setToDoList] = useState(toDoData);
  const [newTask, setNewTask] =
  useState('');
  const [completeTask, setCompleteTask] =
  useState('');

  const fetchList = () => {
    axios.get('/list')
    .then((response) => {
      console.log(response);
      console.log(response.data);
      setToDoList(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const addList = (event) => {
    event.preventDefault();
    axios.post(`/list`, {task: newTask, complete: completeTask})
    .then( (response) => {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  useEffect(() => {
    fetchList()
  }, [])
 
  return (
    <div>
      <h1>TO DO APP</h1>

      <form onSubmit={addList}>
        <label>Task</label>
        <input onChange={ (event) => setNewTask(event.target.value)}   />
        <label>Complete</label>
        <input onChange={ (event) => setCompleteTask(event.target.value)} />
        <button type="submit">Add Task</button>
      </form>

      {toDoList.map(list =>
      (<li key={list.task}>
        {list.task} is {list.complete}
      </li>
      ))}

    </div>
  );

}
// above add ul? what will make a bullet point 
export default App
