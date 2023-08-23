import {useState,  useEffect} from 'react';
import axios from 'axios';
import './App.css'

// hold to to items
let toDoData = [];

function App () {
  const [toDoList, setToDoList] = useState(toDoData);
  const [newTask, setNewTask] =
  useState('');
  const [completeTask, setCompleteTask] =
  useState('');

  //gets the tasks from the server
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

  //called when submitted to post the requesti and ass new task to list
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

  //marks task as complete
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

  //delete task from from list and table
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

 //renders to the DOM a form for adding tasks
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

    {/* renders list of tasks to DOM with buttons */}
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
