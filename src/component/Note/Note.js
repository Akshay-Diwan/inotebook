import React, { useContext, useEffect} from 'react'
import './Note.css'
import noteContext from '../../Context/noteContext';
import { useParams } from 'react-router-dom';
import Editable from './Editable';
import Saved from './Saved';
const Note = () => {
const a = useContext(noteContext);
const { id }= useParams();

useEffect(()=>{
  a.openNote(id);
})

  return (
      <div className="inputGp" style={{width: "80vw", margin: "2px"}}>

    {(a.edit)?<Editable/>:<Saved/>}

</div>
    
  )
  
}

export default Note
