import React, { useContext } from 'react'
import './EditorBar.css'
import Tab from '../Tab'
import noteContext from '../../Context/noteContext';
import { useNavigate } from 'react-router-dom';

const EditorBar = () => {
  const navigate = useNavigate();
  const a = useContext(noteContext);
  const logoutUser = ()=>{
    localStorage.removeItem('token');
    navigate('/');
  }
  return (
    <div className='editBar' style={{marginLeft: "1.5px"}}>
 
        
  {/* <li className="nav-item">
    <a className="nav-link active" aria-current="page" href="#">New document <button className='close'>X</button></a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="#">Link</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="#">Link</a>
  </li>
  <li className="nav-item">
    <a className="nav-link disabled" aria-disabled="true">Disabled</a>
  </li>
  <li>
    <button className='add-button'>+</button>
  </li> */}
  
    <button onClick={a.changeMode}>{(a.edit)?'Save':'Edit'}</button>
   <button onClick={logoutUser}>Logout</button> 


    </div>
  )
}

export default EditorBar
