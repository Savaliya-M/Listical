import React from "react";
import Admincompo from "@Admin_components/Admincompo";
import sidebar from './sidebar.module.scss';
import Managercompo from "../Manager_components/Managercompo";
import Employeecompo from "../Employee_components/Employeecompo";

const Sidebar = (props) => {
  //   const [user, setUser] = useState({email:"",type:""});
  //   useEffect(() => {
  //     setUser({email:localStorage.getItem('email'),type:localStorage.getItem('Type')});
  // }, []);
  return (
    <>
    <div className={sidebar.mainsidebar}>
      {props.type === "Admin" ?  
      <Admincompo/>
      : ""}
       {props.type === "Manager" ? 
      <Managercompo/>
      : ""}
      {props.type === "Employee" ? 
      <Employeecompo/>
      : ""}
      </div>
    </>
  );
};

export default Sidebar;
