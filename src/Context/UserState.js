
import { useState } from "react";
import UserContext from "./userContext";
import { useNavigate } from 'react-router-dom';


const UserState = (props)=>{
    const [invalid, setInvalid] = useState(false);
    const navigate = useNavigate();
    const host = 'https://inotebook-backend-jthn.onrender.com';
    const getUserId = async ()=>{
        const response = await fetch(`${host}/api/auth/getUser`,{
            method: 'POST',
            headers:{
                "auth-token": `${localStorage.getItem('token')}`
            },
        });
        const json = await response.json();
        return json._id;
    }
    const authenticateUser = async (email, password)=>{
        const data = {
            email: email,
            password: password
        }
        const response = await fetch(`${host}/api/auth/login`,
            {
                method: 'POST',
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );
        try{
        const json = await response.json();
        if(response.status === 400){
            setInvalid(true);
            console.log("Invalid Credentials");
        }
        if(response.status === 500){
            console.log("Internal Server Error");
        }
        if(response.ok){
            console.log("Success: "+json.authToken);
            localStorage.setItem('token',json.authToken);
            
        }
        navigate('/Notes');

        // window.location.replace('/Notes');
        }
        catch(error){
            console.log("No user found");
        }
        
        
    }
    const newUser = async (name,email,password)=>{
        const data = {
            name: name,
            email: email,
            password: password 
        }
        const response = await fetch(`${host}/api/auth/createUser`,
            {
                method: 'POST',
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)

            }
        );
        try{
        if(response.status===400){
            setInvalid(true);
            return;
        }
        setInvalid(false);
        const json = await response.json();
        console.log(json);
        window.location.replace('/Notes');
        }
        catch(error){
            console.log("No user found");
        }
    }
    return( 
        <UserContext.Provider value = {{authenticateUser, newUser, getUserId, invalid}}>{props.children}</UserContext.Provider>
    );
}
export default UserState;
