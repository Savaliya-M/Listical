import React from "react";
import auth from './auth.module.scss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "@routes/Auth/Signup";
import Login from "@routes/Auth/Login";
import Admincompo from "@Admin_components/Admincompo";
import Managercompo from "@Manager_components/Managercompo";
import Employeecompo from "@Employee_components/Employeecompo";

const Auth = () => {
  return (
    <>
    <div className={auth.mainlogin_signup}>
      {/* <Router> */}
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/admincompo/*" element={<Admincompo/>} />
          <Route exact path="/managercompo/*" element={<Managercompo/>} />
          <Route exact path="/admincompo/*" element={<Employeecompo/>} />
        </Routes>
      {/* </Router> */}
      </div>    
    </>
  );
};

export default Auth;
