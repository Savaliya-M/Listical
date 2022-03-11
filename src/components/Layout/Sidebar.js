import React from "react";
import sidebar from "./sidebar.module.scss";
import Admincompo from "@Admin_components/Admincompo";
import Managercompo from "../Manager_components/Managercompo";
import Employeecompo from "../Employee_components/Employeecompo";

const Sidebar = (props) => {
  return (
    <>
      <div className={sidebar.mainsidebar}>
        {props.type === "Admin" ? <Admincompo /> : ""}
        {props.type === "Manager" ? <Managercompo /> : ""}
        {props.type === "Employee" ? <Employeecompo /> : ""}
      </div>
    </>
  );
};

export default Sidebar;
