import React, { useState } from 'react'
import '../Styles/Form.css'
import axios from 'axios';

function Form({todos , setTodos}) {
    const [newTodo , setNewTodo] = useState({Task : "" , Description : "" });

    const changeHandler = (event) => {
        setNewTodo((prev) => {
            return {
                ...prev , 
                [event.target.name] : event.target.value
            }
        })
    };

    const addNewTodo = async(event) => {
        const token = localStorage.getItem('Token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
        };
        event.preventDefault();
        const response = await axios.post('http://localhost:3000/user/newTodo' , newTodo , {headers});
        const newTodos = [...todos , response.data.newTodo];
        setNewTodo({Task : "" , Description : ""});
        setTodos(newTodos);
    }
  return (
    
        <form className='forms' onSubmit={addNewTodo}>

        <input 
        className='task'
        type="text"
        placeholder='Task'
        onChange={changeHandler}
        name='Task'
        value={newTodo.Task} />

        <input 
        className='description'
        type="text"
        placeholder='Description'
        onChange={changeHandler}
        name='Description'
        value={newTodo.Description}
         />

         <button className='submit-btn' type='submit'>Add This Todo</button>

        </form>
  )
}

export default Form
