import React from "react";
import Admincompo from "@Admin_components/Admincompo";
<<<<<<< HEAD
import sidebar from './sidebar.module.scss';
=======
import "./sidebar.css";
>>>>>>> a77f2875bc9b8212291e4da7810cb4d3f388acaf
import Managercompo from "../Manager_components/Managercompo";
import Employeecompo from "../Employee_components/Employeecompo";

const Sidebar = (props) => {
  //   const [user, setUser] = useState({email:"",type:""});
  //   useEffect(() => {
  //     setUser({email:localStorage.getItem('email'),type:localStorage.getItem('Type')});
  // }, []);
  return (
    <>
<<<<<<< HEAD
    <div className={sidebar.mainsidebar}>
      {user.type === "Admin" ?  
      <Admincompo/>
      : ""}
       {user.type === "Manager" ? 
      <Managercompo/>
      : ""}
      {user.type === "Employee" ? 
      <Employeecompo/>
      : ""}
=======
      <div className="mainsidebar">
        {props.type === "Admin" ? <Admincompo /> : ""}
        {props.type === "Manager" ? <Managercompo /> : ""}
        {props.type === "Employee" ? <Employeecompo /> : ""}
>>>>>>> a77f2875bc9b8212291e4da7810cb4d3f388acaf
      </div>
    </>
  );
};

export default Sidebar;
