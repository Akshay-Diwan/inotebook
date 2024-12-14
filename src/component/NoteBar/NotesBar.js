import React,{useContext, useEffect, useState} from 'react'
import './NotesBar.css';
import NoteFile from '../NoteFile';
import noteContext from '../../Context/noteContext';
const Notes = () => {
  const a = useContext(noteContext);
  useEffect(()=> {
    a.fetchNotes();
    // a.setNewNote(null);
    console.log('Running useEffect');
  },[]);
  // const fetchingNotes= async ()=>{
  //   const json = await a.fetchNotes();
  //   setNotes(json);
  // }
  

 
  
  return (
    <>
      <div className="list-group">
        <h4>INOTEBOOK</h4>
        {a.notes.map((note)=> <NoteFile title = {note.title} description={note.description} _id = {note._id} dateS = {note.date}/>)} 
</div>
    </>
  )
}


export default Notes
