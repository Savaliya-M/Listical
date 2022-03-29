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

    appRef
      .child("Users")
      .get()
      .then((snapshot) => {
        console.log("loading start");
        const userData = snapshot.val();
        let flag = true;
        Object.values(userData).forEach((elem) => {
          if (
            elem.email === authuserdata.email &&
            elem.pass === authuserdata.password &&
            elem.activate === true
          ) {
            flag = false;
            localStorage.setItem("uuid", elem.uuid);
            localStorage.setItem("Type", elem.position);
            // localStorage.setItem("name", elem.name);
            navigate("/layout/");
            return;
          }
        });

        if (flag) {
          alert("Plese fill Correct detail");
        }
        console.log("loading end");
      });

    // appRef.child("Users").on("value", (snapshot) => {
    //   console.log("loading start");
    //   const userData = snapshot.val();
    //   let flag = true;
    //   Object.values(userData).forEach((elem) => {
    //     if (
    //       elem.email === authuserdata.email &&
    //       elem.pass === authuserdata.password &&
    //       elem.activate === true
    //     ) {
    //       flag = false;
    //       localStorage.setItem("uuid", elem.uuid);
    //       localStorage.setItem("Type", elem.position);
    //       // localStorage.setItem("name", elem.name);
    //       navigate("/layout/");
    //       return;
    //     }
    //   });
    //   console.log("DONE");
    //   // if (flag) {
    //   //   alert("Plese fill Correct detail");
    //   // }
    //   console.log("loading end");
    // });
  };

  return (
    <>
      <div className={login.loginpage}>
        <div className={login.log}></div>
        <div className={login.log2}></div>
        <div className={login.loginpart}>
          <div className={login.loginside1}>
            <img src={require("@photos/Listical.png")} alt="" />
            <h1>Listical</h1>
            <h2>Welcome!</h2>
          </div>
          <div className={login.loginside2}>
            <div className={login.loginform}>
              <div className={login.logintitle}>
                <h6>Welcome In Listical</h6>
                <h2>Log in</h2>
              </div>
              <div className={login.fields}>
                <div className={login.fields1}>
                  User Email
                  <div>
                    <input
                      className={login.textbox}
                      placeholder="Listical@email.com"
                      type="text"
                      value={authuserdata.email}
                      name="email"
                      onChange={logdetail}
                    />
                  </div>
                </div>
                <div className={login.fields2}>
                  Password
                  <div>
                    <input
                      className={login.textbox}
                      placeholder="Enter Your Password"
                      type="password"
                      value={authuserdata.password}
                      name="password"
                      onChange={logdetail}
                    />
                  </div>
                </div>
                <div className={login.btns}>
                  <div>
                    <input
                      className={login.btn1}
                      type="submit"
                      value="Login"
                      onClick={authUser}
                    />
                  </div>
                  {/* <input type="reset" /> */}
                </div>
              </div>
            </div>
            <div className={login.signup}>
              Not a member?
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <div className={login.signbtn}>Signup Now</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
