import React from "react";
import Usercompo from "./Usercompo";
import {  Routes, Route} from "react-router-dom";
import Userinfo from "@user/userinfo/Userinfo"
import './user.css';

const User = () => {
  // const {user} = name;
  // console.log(user);
  return (
    <>
      <div className="mainuser">
          <Routes>
              <Route exact path="/" element={<Usercompo/>} />
              <Route exact path="info" element={<Userinfo />} />
          </Routes>
      </div>
    </>
  );
};

export default User;
