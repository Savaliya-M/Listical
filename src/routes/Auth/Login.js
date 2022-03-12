import React, { useState } from "react";
import login from "./login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import appRef from "../../firebase";
// import Admincompo from "@Admin_components/Admincompo";
// import Managercompo from "@Manager_components/Managercompo";
// import Employeecompo from "@Employee_components/Employeecompo";

const Login = () => {
  const [authuserdata, setAuthuserdata] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const logdetail = (e) => {
    e.preventDefault();
    setAuthuserdata({ ...authuserdata, [e.target.name]: e.target.value });
  };

  const authUser = async (e) => {
    e.preventDefault();

    appRef.child("Users").on("value", (snapshot) => {
      console.log("loading start");
      const userData = snapshot.val();
      let flag = false;
      Object.values(userData).forEach((elem) => {
        if (
          elem.email === authuserdata.email &&
          elem.pass === authuserdata.password &&
          elem.activate === true
        ) {
          flag = true;
          localStorage.setItem("uuid", elem.uuid);
          localStorage.setItem("Type", elem.position);
          // localStorage.setItem("name", elem.name);
          navigate("/layout/");
          return;
        }
        //   else if (
        //   elem.email === authuserdata.email &&
        //   elem.pass === authuserdata.password &&
        //   elem.position === "Manager"
        //   ) {
        //   flag = true;
        //   alert("Manager");
        //   localStorage.setItem('email',elem.email);
        //   localStorage.setItem('Type',elem.position);
        //  navigate("/managercompo/");
        //   return;
        //   }
      });
      if (!flag) {
        alert("Plese fill Correct detail");
      }
      console.log("loading end");
    });
  };

  return (
    <>
      <div className={login.loginpage}>
      <div className={login.log}>
      </div>
      <div className={login.log2}>
      </div>
        <div className={login.loginpart}>
          <div className={login.loginside1}>
            <img src={require(("@photos/Listical.png"))} alt="" />
            <h1>Listical</h1>
          </div>
          <div className={login.loginside2}>
            <div className={login.loginform}>
            <div className={login.logintitle}>
              <h2>Log in</h2>
            </div>
              <div>
                Username
                <div>
                <input
                  type="text"
                  value={authuserdata.email}
                  name="email"
                  onChange={logdetail}
                />
                </div>
              </div>
              <div>
                Password
                <div> 
                <input
                  type="password"
                  value={authuserdata.password}
                  name="password"
                  onChange={logdetail}
                />
                </div>
              </div>
              <div>
                <input type="submit" onClick={authUser} />
                <input type="reset" />
              </div>
            </div>
            Not a member?
            <Link to="/signup">Signup Now</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
