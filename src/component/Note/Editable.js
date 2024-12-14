import React, { useContext } from 'react'
import './Note.css'
import noteContext from '../../Context/noteContext'

const Editable = () => {
    const a = useContext(noteContext)
  return (
    <>
        <input style={{backgroundColor: 'black', color: 'white'}} className="title" onChange={async (e)=>{a.updateNote({title: e.target.value},a.content.id)}} defaultValue={a.content.title} placeholder='Title'/>
  <hr style={{margin: "0px"}}/>
  <textarea style={{backgroundColor: 'black', color: 'white', resize: "none"}} className='description' onChange={(e)=> a.updateNote({description: e.target.value},a.content.id)} defaultValue={a.content.description} placeholder='description' ></textarea>
    </>
  )
}

export default Editable
