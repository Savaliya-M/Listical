import React from "react";
import navbar from "./navbar.module.scss";
import { useNavigate } from "react-router-dom";

const Navbar = ({ name, uid }) => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("uuid");
    localStorage.removeItem("Type");
    navigate("/");
  };
  return (
    <>
      <div className={navbar.navbarmain}>
        <div className={navbar.logo}>
          <img src={require("@photos/Listical.png")} alt="logo" />
          <h1 className={navbar.azonix}>LISTICAL</h1>
        </div>

        <div className={navbar.user}>
          <div className={navbar.uicon}>
            <img src={require("@photos/man.png")} alt="logo" />
          </div>
          <div className={navbar.uname}>
            <h3 onClick={() => navigate(`user/info/${uid}`)}>{name}</h3>
          </div>
          <div className={navbar.logout}>
            <button onClick={logOut}>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
