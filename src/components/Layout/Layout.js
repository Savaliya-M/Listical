import React,{useEffect, useState} from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import {Routes, Route} from "react-router-dom";
import Home from "@home/Home";
// import Auth from '@components/Auth/Auth'
import User from "@user/User";
import Project from "@projects/Project";
import './layout.css';

const Layout = () => {
  const [user, setUser] = useState({email:"",type:""});
  useEffect(() => {
    setUser({email:localStorage.getItem('email'),type:localStorage.getItem('Type')});
}, []);

  return (
    <>

    <div className="mainlayout">
        <div className="sidebar">
        <Sidebar/>
        </div>
        <div className="navbar">
        <Navbar/>
        </div>
        <div className="routes">
        {user.type==="Admin" ?
        <Routes>
              <Route path="/" element={<Home />} />
              <Route exact path="user/*" element={<User />} />
              <Route exact path="project" element={<Project />} />
        </Routes>:""
        }
        {user.type==="Manager" ?
        // <Routes>
        //       <Route path="/" element={<Home />} />
        //       <Route exact path="user/*" element={<User />} />
        //       <Route exact path="project" element={<Project />} />
        // </Routes>
        <h1>"This is manager"</h1>
        :""
        }
        </div>
    </div>
   
    </>
  )
}

export default Layout