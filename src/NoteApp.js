import React, { useContext, useEffect, useState } from 'react'
import AddButton from './component/AddButton/AddButton'
import EditorBar from './component/EditorBar/EditorBar'
import NotesBar from './component/NoteBar/NotesBar'

import './NoteApp.css'
import{
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
    useNavigate
  } from "react-router-dom"
import userContext from './Context/userContext'

const NoteApp = () => {
  const [userId, setUserId] = useState('');
 const a = useContext(userContext);
  const navigate = useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem('token')){
      console.log("not found");
        navigate('/');
    }
    else{
     setUserId(a.getUserId());
    }
  },[]);
  return (
    
    <div className='NoteAppContainer'>
       <NotesBar/>
      <div className='addContents' style={{color: "grey"}}>Open or create a new note</div>
      <div className='notecontainer'>
      <EditorBar/>
      <Outlet/>
      </div>
      <AddButton userId={userId}/>
      
    </div>
  
  )
}

export default NoteApp
