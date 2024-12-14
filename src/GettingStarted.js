import React, { useState, useContext, useEffect } from 'react'
import './GettingStarted.css'
import userContext from './Context/userContext';
import {Link} from 'react-router-dom'
const GettingStarted = () => {
  useEffect(()=>{
    localStorage.removeItem('token');
  },[])
  const a = useContext(userContext);
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onSubmit = () =>{
    console.log(a.trial);
      a.authenticateUser(email, password);
     
  }
  const emailOnChange = (input)=>{
    setEmail(input);
    
  }
  const passwordOnChange = (input)=>{
    setPassword(input);
  }
  return (
    <div className='StartContainer'>
    <div className='Design'>
      <div className='heading'>Welcome to INotebook</div>
      <div className='about'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit ipsum animi consequatur esse quaerat reiciendis accusamus impedit ut nisi. Iusto reiciendis nihil non iure ipsum?</div>
    </div>
    <div className='image-container'>
   <div className='LoginContainer'>
    <h1 style={{color: 'white'}}>Login</h1>
    {a.invalid?<h6 style={{color: "red", marginBottom: "20px"}}>Invalid Credentials!</h6>:<></>}
    
    <div className="form-floating mb-3">
   
    <input type="email" className="form-control" id="floatingInput" onChange = {(e)=>{emailOnChange(e.target.value)}} placeholder="name@example.com"/>
    
    <label htmlFor="floatingInput">Email address</label>
  </div>
  <div className="form-floating">
    <input type="password" className="form-control" id="floatingPassword" onChange = {(e)=>{passwordOnChange(e.target.value)}} placeholder="Password"/>
    <label htmlFor="floatingPassword">Password</label>
  </div>
      <button className='LoginButton' onClick={onSubmit}>Login</button>
      <Link className='SignUp-link' to="/SignUp">new User?</Link>
      {/* <button onClick>Sign Up</button> */}
      </div>
      </div>
  </div>
  )
}

export default GettingStarted
