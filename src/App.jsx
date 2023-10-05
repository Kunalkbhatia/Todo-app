import React from 'react';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import SignUp from './components/SignUp.jsx';
import SignIn from './components/SignIn.jsx';
import './App.css';


function App() {


  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<SignUp/>}/>
        <Route path='/SignIn' element={<SignIn/>}/>
        <Route path='/Home' element={<Home/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
