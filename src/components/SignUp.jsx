import React, { useState } from 'react'
import { Link  , useNavigate} from 'react-router-dom';

import '../Styles/SignUp.css'
import axios from 'axios';

function SignUp() {
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
        const response = await axios.post('http://localhost:3000/user/Signup' , user);
        const token = response.data.token;
        localStorage.setItem('Token', token);
        navigate('/Home');
        
    }

  return (
    <div className='signup-container' >
        <form className='signup-form' onSubmit={addUser}>
            <h1 className='heading'>Create your account</h1>
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
                <button className='Signup-btn' type='submit'>Sign Up</button>
             </div>
             <Link to='/SignIn' style={{ textDecoration: 'none' , color : 'white' , fontSize: '1.9rem'}}>Already have an account?</Link>
        </form>
    </div>
  )
}

export default SignUp
