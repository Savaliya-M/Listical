import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const [user, setUser] = useState({
        email:"",
        type:"",
    })
    const navigate = useNavigate();
    useEffect(() => {
        setUser({...user,email:localStorage.getItem('email'),type:localStorage.getItem('Type')});
    }, []);

   
        if(user.type === "Admin"){
            navigate('/layout/');
        }else{
            navigate('/login');
        }
    
    
  return (
    <>
        Loading
    </>
  )
}

export default Main