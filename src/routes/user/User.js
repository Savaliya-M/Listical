import React from "react";
import Usercompo from "./Usercompo";
import { Routes, Route } from "react-router-dom";
import Userinfo from "@user/userinfo/Userinfo";
import "./user.css";

const User = (props) => {
  // const {user} = name;
  // console.log(user);
  return (
    <>
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
      </div>
    </>
  );
};

export default User;
