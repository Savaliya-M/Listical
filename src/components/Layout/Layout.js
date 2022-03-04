import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Routes, Route } from "react-router-dom";
import Home from "@home/Home";
import User from "@user/User";
import Project from "@projects/Project";
import layout from './layout.module.scss';
import appRef from '../../firebase';

const Layout = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    // setUser({email:localStorage.getItem('email'),type:localStorage.getItem('Type')});
    appRef.child('Users').on("value", (snapshot) => {
      const userData = snapshot.val();
      Object.values(userData).forEach((elem) => {
        if (elem.email === localStorage.getItem("email")) {
          setUser(elem);
        }
      })
    })
  }, []);

  return (
    <>
      <div className={layout.mainlayout}>
        <div className="sidebar">
          <Sidebar type={user.position} />
        </div>
        <div className={layout.navbar}>
          <Navbar name={user.name} />
        </div>
        <div className={layout.routes}>
          {user.position === "Admin" ?
            <Routes>
              <Route path="/" element={<Home />} />
              <Route exact path="user/*" element={<User />} />
              <Route exact path="project" element={<Project />} />
            </Routes> : ""
          }
          {user.position === "Manager" ?
            // <Routes>
            //       <Route path="/" element={<Home />} />
            //       <Route exact path="user/*" element={<User />} />
            //       <Route exact path="project" element={<Project />} />
            // </Routes>
            <h1>"This is manager"</h1>
            : ""
          }
          {user.position === "Employee" ?
            // <Routes>
            //       <Route path="/" element={<Home />} />
            //       <Route exact path="user/*" element={<User />} />
            //       <Route exact path="project" element={<Project />} />
            // </Routes>
            <h1>"This is Employee"</h1>
            : ""
          }
        </div>
      </div>

    </>
  )
}

export default Layout