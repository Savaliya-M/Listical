import React from "react";
import users from "./user.module.scss";
import Usercompo from "./Usercompo";
import { Routes, Route } from "react-router-dom";
import Userinfo from "@user/userinfo/Userinfo";

const User = (props) => {
  // const {user} = name;
  // console.log(user);
  return (
    <>
      <div className={users.mainuser}>
        <div className={users.togglebtn}>
          <button >List</button>
        </div>
        <div className={users.usercomp}>
          <Routes>
            <Route exact path="/" element={<Usercompo />} />
            <Route exact path="info/:id" element={<Userinfo />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default User;
