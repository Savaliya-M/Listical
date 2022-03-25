import React from "react";
import users from "./user.module.scss";
import Usercompo from "./Usercompo";
import { Routes, Route } from "react-router-dom";
import Userinfo from "@user/userinfo/Userinfo";
import Chat from "../Chat/Chat";
import Editdetail from "./userinfo/Editdetail";

const User = () => {
  return (
    <>
      <div className={users.mainuser}>
        <div className={users.usercomp}>
          <Routes>
            <Route exact path="/" element={<Usercompo />} />
            <Route exact path="info/:id" element={<Userinfo />} />
            <Route exact path="editdetail/:id" element={<Editdetail />} />
            <Route exact path="chat/:id/:sid" element={<Chat />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default User;
