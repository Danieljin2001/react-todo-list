
import { useEffect, useRef, useState } from 'react';
import './CSS/Todo.css';
import TodoItems from './TodoItems';

let count = 0;
const Todo = () => {


  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);

  const add = () => {
    setTodos([...todos, {no:count++, text:inputRef.current.value, display:""}])
    inputRef.current.value = "";
    localStorage.setItem("todo_count", count)
  }

  useEffect(()=> {
    setTodos(JSON.parse(localStorage.getItem("todos")));
    count = localStorage.getItem("todo_count");

  },[])

  useEffect(()=>{
    
    setTimeout(() => {
      console.log(todos);
      localStorage.setItem("todos", JSON.stringify(todos))
    }, 100);
  },[todos])

  return (
    <div className='todo'>
      <div className ="todo-header">To-Do List</div>
      <div className = "todo-add">
        <input ref= {inputRef} type="text" placeholder='Add Your Task' className='todo-input'></input>
        <div onClick={()=>{add()}} className='todo-add-btn'>ADD</div>
      </div>
      <div className='todo-list'>
        {todos.map((item,index)=>{
          return<TodoItems key={index} setTodos={setTodos} no={item.no} display={item.display} text ={item.text}/>
        })}
      </div>
    </div>
  )
}

export default Todo
