import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import navbar from "./navbar.module.scss";

const Navbar = (props) => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("Type");
    navigate("/")
  }
  return (
    <>
      <div className={navbar.navbarmain}>
        <div className={navbar.logo}>
        {/* <img src={require("@photos/Logo.png")} alt="logo" /> */}
          <h1>LISTICAL</h1>
        </div>
        <div className={navbar.user}>
          <div className={navbar.uicon}>
            <h3>Icon</h3>
          </div>
          <div className={navbar.uname}>
            <h3>{props.name}</h3>
          </div>
          <div >
            <button onClick={logOut}>Logout</button>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Navbar;
