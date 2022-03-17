import React from "react";
// import employeecompo from "./employecompo.module.scss";
import employeecompo from "../Admin_components/admincompo.module.scss";
import { Link } from "react-router-dom";

const Employeecompo = () => {
  return (
    <>
      {/* <div className={employeecompo.maindivsidebar}>
        <div className={employeecompo.sidebar}>
          <ul className={employeecompo.sidebarlist}>
            <li className={employeecompo.rows}>
              <div className={employeecompo.icone}>
                <img src={require("@photos/house.png")} />
              </div>
              <Link className={employeecompo.title} to="/">
                Home
              </Link>
            </li>
            <li className={employeecompo.rows}>
              <div className={employeecompo.icone}>
                <img src={require("@photos/people.png")} alt="People" />
              </div>
              <Link className={employeecompo.title} to="user">
                User
              </Link>
            </li>
            <li className={employeecompo.rows}>
              <div className={employeecompo.icone}>
                <img src={require("@photos/project.png")} alt="" />
              </div>
              <Link className={employeecompo.title} to="project">
                Project
              </Link>
            </li>
          </ul>
        </div>
      </div> */}
      <div className={employeecompo.maindivsidebar}>
        <div className={employeecompo.sidebar}>
          <ul className={employeecompo.sidebarlist}>
            <li className={employeecompo.rows}>
              <Link className={employeecompo.title} to="/">
                <div className={employeecompo.icone}>
                  <img src={require("@photos/house.png")} />
                  {/*   Home  */}
                </div>
              </Link>
            </li>
            <li className={employeecompo.rows}>
              <Link className={employeecompo.title} to="project">
                <div className={employeecompo.icone}>
                  <img src={require("@photos/project.png")} alt="" />
                  {/* Project */}
                </div>
              </Link>
            </li>
            <li className={employeecompo.rows}>
              <Link className={employeecompo.title} to="employeeapproval">
                <div className={employeecompo.icone}>
                  <img src={require("@photos/people.png")} alt="People" />
                  {/* User */}
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Employeecompo;
