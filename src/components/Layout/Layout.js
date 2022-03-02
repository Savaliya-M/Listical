import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import {BrowserRouter as Router,  Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "@home/Home";
// import Auth from '@components/Auth/Auth'
import User from "@user/User";
import Project from "@projects/Project";
import './layout.css';

const Layout = () => {
  return (
    <>
    <Router>
    <div className="mainlayout">
        <div className="sidebarr">
        <Sidebar/>
        </div>
        <div className="navbarr">
        <Navbar/>
        </div>
        <div className="routesr">
        <Routes>
              <Route  path="/" element={<Home />} />
              <Route exact path="user/*" element={<User />} />
              <Route exact path="project" element={<Project />} />
        </Routes>
        </div>
    </div>
    </Router>
    </>
  )
}

export default Layout