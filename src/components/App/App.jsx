import {useState,  useEffect} from 'react';
import axios from 'axios';
import './App.css'

let toDoData = [];

function App () {
  const [toDoList, setToDoList] = useState(toDoData);
  const [newTask, setNewTask] =
  useState('');
  const [completeTask, setCompleteTask] =
  useState('');

  const fetchList = () => {
    axios.get('/todo')
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
    axios.post(`/todo`, {task: newTask, complete: completeTask})
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

  const toggleTask = (id) => {
    axios.put(`/todo/toggle/${id}`)
    .then((response) =>{
      console.log(response);
      fetchCreatures();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const deleteTask = (id) => {
    axios.delete(`/todo/${id}`)
    .then((response) =>{
      console.log(response);
      fetchCreatures();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

 
  return (
    <div className='App'>
      <div className='App-header'>
      <h1>TO DO APP</h1>
      </div>
    <div className='form'>
      <form onSubmit={addList}>
        <label>Task</label>
        <input onChange={ (event) => setNewTask(event.target.value)}   />
        <label>Complete</label>
        <input onChange={ (event) => setCompleteTask(event.target.value)} />
        <button type="submit">Add Task</button>
        <br/>
        <br/> 
      </form>
      </div>

    <div className='list'>
      {toDoList.map(list =>
      
      (list.complete) ? (
        <li key={list.id} className = {list.complete ? 'complete' : 'standard'}>
        {list.task}, COMPLETE 
        <br/>
        <button onClick={() => deleteTask(list.id)}>Delete</button>
        </li>
      )

      :(<li key={list.id} className = {list.complete ? 'complete' : 'standard'}>
        {list.task} is {String(list.complete)}
        <br/>
        <button onClick={() => deleteTask(list.id)}>Delete</button>
        <button onClick={() => toggleTask(list.id)}>Complete</button>
      </li>
      ))}
      </div>

    </div>
  );

}

export default App;
