import React from "react";
import "./app.css";
// import Auth from "./components/Auth/Auth";
import Layout from "./components/Layout/Layout";
import Login from "@routes/Auth/Login";
import Signup from "@routes/Auth/Signup";
import {BrowserRouter as Router,  Routes, Route} from "react-router-dom";
import Main from "./Main";

function App() {
  return (
    <>
      <Router>
        <div className="appmain">
        <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/Signup" element={<Signup />} />
        <Route exact path="/layout/*" element={<Layout/>} />
        {/* <Route exact path="/Signup" element={<Signup />} /> */}
         
        </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
