import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';

const Main = () => {
    const [user, setUser] = useState({
        email:"",
        type:"",
    })
    const navigate = useNavigate();
    useEffect(() => {
        setUser({email:localStorage.getItem('email'),type:localStorage.getItem('Type')});
    }, []);

   
        if(user.type === "Admin" || user.type === "Manager" || user.type === "Employee" ){
            navigate('/layout/');
        }
   
        // else if(user.type === "Manager"){
        //     navigate('/layout/',{state:{type:"Manager",email:user.email}});
        // }
   
        // else if(user.type === "Employee"){
        //     navigate('/layout/',{state:{type:"Employee",email:user.email}});
        // }
        else{
            navigate('/login');
        }
    // }
    
  return (
    <>
        Loading
    </>
  )
}

export default Main