import React, { useState } from 'react'
import { Link  , useNavigate} from 'react-router-dom';

import '../Styles/SignIn.css'
import axios from 'axios';

function SignIn() {
    const navigate = useNavigate();
    const [user , setUser] = useState({username : "" , password : ""});
    const changeHandler = (event)=> {
        let {name , value} = event.target;
        setUser((prev) => {
            return {
                ...prev , 
                [name] : value
            }
        })
    };

    const addUser = async (event)=> {
        event.preventDefault();
        const headers = {
          'username': user.username,
          'password': user.password
        };
        console.log(headers);
        const response = await axios.post('http://localhost:3000/user/Signin' , null , {headers});
        console.log(response.message);
        const token = response.data.token;
        localStorage.setItem('Token', token);
        navigate('/Home');
        
    }

  return (
    <div className='SignIn-container' onSubmit={addUser}>
        <form className='SignIn-form' action="">
            <h1 className='heading'>SingIn to you account</h1>
            <input 
            className='username-input'
            type="text"
            placeholder='Username'
            name='username'
            value={user.username}
            onChange={changeHandler}
             />
            <input 
            className='password-input'
            type="password"
            placeholder='Password'
            name='password'
            value={user.password}
            onChange={changeHandler}
             />
             <div>
                <button className='SignIn-btn' type='submit'>Sign In</button>
             </div>
             <Link to="/"  style={{ textDecoration: 'none' , color : 'white' , fontSize: '1.9rem'}}>Create an account?</Link>
        </form>
    </div>
  )
}

export default SignIn
