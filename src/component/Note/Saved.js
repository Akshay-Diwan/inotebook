import React,{useContext} from 'react'
import './Note.css'
import noteContext from '../../Context/noteContext'

const Saved = () => {
    const a = useContext(noteContext)

  return (
    
       <>
        <div  className="title" onChange={async (e)=>{a.updateNote({title: e.target.value},a.content.id)}} placeholder='Title'>{a.content.title}</div>
  <hr style={{margin: "0px"}}/>
  <div  className='description' onChange={(e)=> a.updateNote({description: e.target.value},a.content.id)} placeholder='description'>{a.content.description}</div>
    </>
    
  )
}

export default Saved
