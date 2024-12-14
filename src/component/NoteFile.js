import React, { useContext } from 'react'
import noteContext from '../Context/noteContext'
import './NoteFile.css'
import { Link } from 'react-router-dom';
const NoteFile = ({title, description,_id,dateS}) => {
  const a = useContext(noteContext);
  const lastEdited = ()=>{
    const now = new Date();
    let dateString = dateS;
    dateString = dateString.replace(/ /g, '-').replace('t', 'T').replace(/:/g, ':').replace('414', '.414').replace('00-00', '00:00');
    const date = new Date(dateString);
    if(now.getMonth()-date.getMonth() >= 12){
      return `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`
    }
    if(now.getMonth()-date.getMonth() >= 1){
        return `${(now.getMonth() - date.getMonth())} months ago`
    }
    if(now.getDate() - date.getDate() >= 7){
    return `${(now.getDate() - date.getDate())/7} weeks ago`
    }
    if(now.getDate()-date.getDate() < 7 && now.getDate()-date.getDate() > 1){
        return `${now.getDate() - date.getDate()} days ago`;
    }
    if(now.getDate()-date.getDate() === 1){
      return "yesterday";
    }
    if(now.getHours() - date.getHours() > 0){
      return `${now.getHours() - date.getHours()} hours ago`;
    }
    if(now.getMinutes() - date.getMinutes() > 0){
       return `${now.getMinutes() - date.getMinutes()} minutes ago`
    }
    return "now";
  }
  return (
    <div >
      <Link  to={`/Notes/${_id}`} onClick={()=>{a.setEdit(false);a.openNote(_id)}} href="#" className="list-group-item list-group-item-action" aria-current="true">
    <div className="d-flex w-100 justify-content-between">
      <h5 className="mb-1">{title}</h5>
      <small>{lastEdited()}</small>
    </div>
    <p className="mb-1">{description}</p>
    <button onClick={(e)=>{   a.deleteNote(_id);e.preventDefault(); e.stopPropagation();}} className='deleteButton'></button>
  </Link>
    </div>
  )
}

export default NoteFile
