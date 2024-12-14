import { useState } from "react";
import NoteContext from "./noteContext";
import { useParams } from "react-router-dom";

const NoteState = (props)=>{
    const host = "http://localhost:5000";
    const [notes,setNotes] = useState([]);
    const [content, setContent] = useState({title: '', description: '', id: ''});
    const [edit, setEdit] =useState(false);
    
    const fetchNotes = async ()=>{
    const response = await fetch(`${host}/api/notes//fetchallnotes`,
        {
            method: 'GET',
            headers :{
                "Content-Type" : "application/json",
                "auth-token" : localStorage.getItem('token')
            }
        }
        
    )
    const json = await response.json();
    if(response.ok){
        setNotes(json);
    }
    // console.log(json);
    
    
    return json;
    
}

const addNote = async (userId)=> {
    const data ={
        title: "Untitled",
        description: "this is the description",
        tag: "General",
        UserId: userId
    }
    const response = await fetch("http://localhost:5000/api/notes/createnote",{
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify(data)
    });
    const json = await response.json();
    console.log(json._id);

    setContent({title: '',description: '',id: json._id});

    const newSet = notes.slice(0,notes.length);
    newSet.push(json);
    setNotes(newSet);
    
}
const updateNote = async (data, id)=>{
    const response = await fetch(`http://localhost:5000/api/notes/updatenote/${id}`,{
        method: 'PUT',
        headers: {
            "Content-Type" : "application/json",
            "auth-token": localStorage.getItem('token'),

        },
        body: JSON.stringify(data)
    })
    const json = await response.json();
    
    setContent({title: json.title, description: json.description, id: id});
    await fetchNotes();
    console.log(json);
}
const deleteNote = async (id)=>{
    const response = await fetch(`http://localhost:5000/api/notes/deletenote/${id}`,{
        method: 'DELETE',
        headers: {
            "Content-Type" : "application/json",
            "auth-token": localStorage.getItem('token'),

        }

    })
    // const newSet = notes.slice(0,notes.length - 1);
    // setNotes(newSet);
    const json = response.json();
    await fetchNotes();
    console.log("Delete: " + json);
}
const openNote = async (id)=>{
    try{
    const response = await fetch('http://localhost:5000/api/notes//fetchonenote',{
        method: 'GET',
        headers: {
            "Content-Type" : "application/json",
            "auth-token" : localStorage.getItem('token'),
            "noteId": `${id}`
        }
    });

    const json = await response.json();
    setContent({title: json.title,description: json.description,id: id});
    return json;
} catch(error){
    window.location.replace('/Notes');
}
}
const changeMode = () =>{
    setEdit(!edit);
    
}
    return (
        <NoteContext.Provider value = {{fetchNotes,openNote, notes, content, addNote, updateNote, deleteNote, edit, changeMode,setEdit}}>{props.children}</NoteContext.Provider>
    )
}
export default NoteState;