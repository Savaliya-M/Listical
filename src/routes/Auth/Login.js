import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import appRef from "../../firebase";
// import Admincompo from "@Admin_components/Admincompo";
// import Managercompo from "@Manager_components/Managercompo";
// import Employeecompo from "@Employee_components/Employeecompo";
import "./login.css";

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

    appRef.child("Users").on("value", (snapshot) => 
    {
        console.log("loading start");
        const userData = snapshot.val();
        let flag = false;
        Object.values(userData).forEach((elem) => 
        {
            if (
            elem.email === authuserdata.email &&
            elem.pass === authuserdata.password &&
            elem.position === "Admin"
            ) {
            flag = true;
            alert("Admin");
            localStorage.setItem('email',elem.email);
            localStorage.setItem('Type',elem.position);
            navigate("/layout/");
            return;
            }
            else if (
            elem.email === authuserdata.email &&
            elem.pass === authuserdata.password &&
            elem.position === "Manager"
            ) {
            flag = true;
            alert("Manager");
            localStorage.setItem('email',elem.email);
            localStorage.setItem('Type',elem.position);
           navigate("/managercompo/");
            return;
            }
            else if (
            elem.email === authuserdata.email &&
            elem.pass === authuserdata.password &&
            elem.position === "Employee"
            ) {
            flag = true;
            alert("Employee");
            localStorage.setItem('email',elem.email);
            localStorage.setItem('Type',elem.position);
            navigate("/employeecompo/");
            return;
            }
        });
      if(!flag ){
          alert("wrong");
      }
      console.log("loading end");
    });
  };


  return (
    <>
      <div className="mainlogin">
        <div className="loginform">
          <h1>Login</h1>
          <div>
            Username :
            <input
              type="text"
              value={authuserdata.email}
              name="email"
              onChange={logdetail}
            />
          </div>
          <div>
            Password :
            <input
              type="password"
              value={authuserdata.password}
              name="password"
              onChange={logdetail}
            />
          </div>
          <div>
            <input type="submit" onClick={authUser} />
            <input type="reset" />
          </div>
        </div>
        Not a member?
        <Link to="/signup">Signup Now</Link>
      </div>
    </>
  );
};

export default Login;
