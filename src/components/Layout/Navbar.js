import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("Type");
    navigate("/")
  }
  // useEffect(() => {
  //  localStorage.getItem("name");
  // }, [])
  
  return (
    <>
      <div className="navbarmain">
        <div className="logo">
          <h1>LISTICAL</h1>
        </div>
        <div className="user">
          <div className="uicon">
            <h3>Icon</h3>
          </div>
          <div className="uname">
            <h3>{localStorage.getItem("name")}</h3>
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
