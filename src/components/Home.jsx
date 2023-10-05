import React, { useEffect, useState } from 'react'
import Form from '../components/Form.jsx';
import List from '../components/List.jsx';
import '../Styles/Home.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [todos , setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('Token');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, 
    };

    const getTodos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/getTodos' , {headers});
        setTodos(response.data.userTodos); // Use response.data to access the todos array.
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    getTodos();
  }, []);

  const logoutHandler = () => {
    localStorage.setItem('Token' , null);
    navigate('/');
  }

  return (
      <>
      <button className='logout-btn' onClick={logoutHandler}>Logout</button>
      <div className='container'>
        <h1>Todo App</h1>
        <Form todos = {todos}  setTodos={setTodos}></Form>
        <List todos={todos} setTodos={setTodos}></List>
      </div>
      </>
  )
}

export default Home
