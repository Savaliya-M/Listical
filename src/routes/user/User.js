import React from "react";
import Usercompo from "./Usercompo";
<<<<<<< HEAD
import {  Routes, Route} from "react-router-dom";
import Userinfo from "@user/userinfo/Userinfo"
import users from './user.module.scss';
=======
import { Routes, Route } from "react-router-dom";
import Userinfo from "@user/userinfo/Userinfo";
import "./user.css";
>>>>>>> a77f2875bc9b8212291e4da7810cb4d3f388acaf

const User = (props) => {
  // const {user} = name;
  // console.log(user);
  return (
    <>
<<<<<<< HEAD
      <div className={users.mainuser}>
          <Routes>
              <Route exact path="/" element={<Usercompo/>} />
              <Route exact path="info" element={<Userinfo />} />
          </Routes>
=======
      <div className="mainuser">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Usercompo
                name={props.user.name}
                mono={props.user.mono}
                post={props.user.post}
              />
            }
          />
          <Route exact path="info/:id" element={<Userinfo />} />
        </Routes>
>>>>>>> a77f2875bc9b8212291e4da7810cb4d3f388acaf
      </div>
    </>
  );
};

export default User;
