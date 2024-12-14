import React, { useContext } from 'react';
import './AddButton.css';
import noteContext from '../../Context/noteContext';

const AddButton = ({userId})=>{
    const a = useContext(noteContext);

    return(<>
    <button onClick={()=>{ console.log(userId);a.addNote(userId)}} className="addbutton"></button>
    </>)
}
export default AddButton;