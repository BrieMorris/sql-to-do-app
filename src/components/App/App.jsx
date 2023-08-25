import {useState,  useEffect} from 'react';
import axios from 'axios';
import './App.css'

import Button from '@mui/material/Button';




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

 // marks task as complete
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
        {/* <button type="submit">Add Task</button> */}
        <Button color='secondary' variant='contained' type="submit"  >Add Task</Button>
        <br/>
        <br/> 
      </form>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Completed</th>
            <th>Delete</th>
          </tr>
        </thead>

    {/* renders list of tasks to DOM with buttons */}
    <tbody className='list'>
      {toDoList.map(list =>
      
      (list.complete) ? (
        <tr key={list.id} className = {list.complete ? 'complete' : 'standard'}>
        <td>{list.task} </td>
         <td> DONE </td>
        {/* <button onClick={() => deleteTask(list.id)}>Delete</button> */}
       <td> <Button onClick={() => deleteTask(list.id)} >Delete</Button></td>
        </tr>
      )

      :(<tr key={list.id} className = {list.complete ? 'complete' : 'standard'}>
        <td> {list.task} </td> 
        <td>{String(list.complete)}</td> 
        <td><Button color='secondary' onClick={() => toggleTask(list.id)} >Complete</Button> </td>
       <td> <Button onClick={() => deleteTask(list.id)} >Delete</Button> </td>
        {/* <button onClick={() => toggleTask(list.id)}>Complete</button> */}
       
      </tr>
      ))}
      </tbody>
      </table>
    </div>
  );

}

export default App;
