import React, { useContext, useState } from 'react'
import './SignUpForm.css'
import userContext from './Context/userContext';
import {Link} from 'react-router-dom'
const SignUpFrom = () => {
    const a = useContext(userContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const emailOnChange = (input)=>{
        setEmail(input);
        
      }
      const nameOnChange = (input)=>{
        setName(input);
        
      }
      const passwordOnChange = (input)=>{
        setPassword(input);
      }
      const createUser=()=>{
        a.newUser(name, email, password);
        
      }
  return (
    <>
    
    <div className="imageContainer">
      <div className='container'>
        <h1>Sign Up</h1>
        {a.invalid?<h6 style={{color: "red", marginBottom: "20px"}}>User with same email Id exists!</h6>:<></>}
      <div className="form-floating mb-3">
    <input type="name" className="form-control" id="floatingInput" onChange = {(e)=>{nameOnChange(e.target.value)}} placeholder="name"/>
    <label htmlFor="floatingInput">Username</label>
  </div>
      <div className="form-floating mb-3">
    <input type="email" className="form-control" id="floatingInput" onChange = {(e)=>{emailOnChange(e.target.value)}} placeholder="name@example.com"/>
    <label htmlFor="floatingInput">Email address</label>
  </div>
  <div className="form-floating">
    <input type="password" className="form-control" id="floatingPassword" onChange = {(e)=>{passwordOnChange(e.target.value)}} placeholder="Password"/>
    <label htmlFor="floatingPassword">Password</label>
  </div>
      <button className='signUp' onClick={createUser} >Sign Up</button>
      <Link to="/">Existing User?</Link>
      </div>
      </div>
    </>
  )
}

export default SignUpFrom
