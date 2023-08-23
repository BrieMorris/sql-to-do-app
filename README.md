# Project Name

[Project Instructions](./INSTRUCTIONS.md), this line may be removed once you have updated the README.md

## Description

To write code for a simple "To-Do List" app built using React and Axios for making HTTP requests. The app allows users to add tasks, mark tasks as complete, and delete tasks. 

First I created a PostgreSQL database table named "List" and inserting two initial tasks into it.

Withing the App function are the use state variables. Then the fetchlist function witch does the server side get request. The addList function which when submitted calls the POST request. The toggleTask function is can mark a task complete using the PUT request. The delete task function does a delete request clearing it from the DOM and sql table. 

The return renders the form to the DOM and the uses toDoList.map to render each task to the DOM. 

The todo.router.js module defines routes to handle HTTP GET, POST, PUT, and DELETE requests for managing tasks in the database. The GET retrieves tasks from database and sends results back to client.The POST adds a new taks to the database. The PUT request toggles the completion of a task. The DELETE removes a task from the database and DOM.

Overall, todo.router.js module defines the API endpoints needed to interact with the database and perform CRUD operations (Create, Read, Update, Delete) on the tasks in the To-Do app.

