import React from 'react'
import '../Styles/List.css'
import axios from 'axios'

function List({todos , setTodos}) {
  const deleteHandler = async (id) => {
    try {
      const token = localStorage.getItem('Token');
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      };
      const  response = await axios.delete(`http://localhost:3000/user/deleteTodo/${id}` , {headers});
      const updatedTodos = todos.filter((todo) => {
        return id !== todo._id;
      });
      console.log(updatedTodos);
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }
  return (
    <div className='display-area'>
      {

        todos.map(({Task , Description , _id},index) => (
        <div className='todo' key={_id}>
          <div className='left'>
          <div className='task-name'>{index+1}.  {Task}</div>
          <div className='description-name'>{Description}</div>
          </div>
          <button className='delete-btn' onClick={() => deleteHandler(_id)}>Done</button>
        </div>
      ))
      
      }
    </div>
  )
}

export default List
