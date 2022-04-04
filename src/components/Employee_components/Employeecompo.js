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
                  <img
                    id={employeecompo.home}
                    src={require("@photos/HOME.png")}
                    alt="icon"
                  />
                  <img src={require("@photos/home.gif")} alt="icon" />
                  {/*   Home  */}
                </div>
              </Link>
            </li>

            <li className={employeecompo.rows}>
              <Link className={employeecompo.title} to="user">
                <div className={employeecompo.icone}>
                  <img
                    id={employeecompo.home}
                    src={require("@photos/USERS.png")}
                    alt="icon"
                  />
                  <img src={require("@photos/users.gif")} alt="icon" />
                  {/* User */}
                </div>
              </Link>
            </li>
            <li className={employeecompo.rows}>
              <Link className={employeecompo.title} to="project">
                <div className={employeecompo.icone}>
                  <img
                    id={employeecompo.home}
                    src={require("@photos/PROJECTS.png")}
                    alt="icon"
                  />
                  <img src={require("@photos/projects.gif")} alt="icon" />

                  {/* Project */}
                </div>
              </Link>
            </li>
            <li className={employeecompo.rows}>
              <Link className={employeecompo.title} to="employeeapproval">
                <div className={employeecompo.icone}>
                  <img
                    id={employeecompo.home}
                    src={require("@photos/APPROVEDS.png")}
                    alt="icon"
                  />
                  <img src={require("@photos/approved.gif")} alt="icon" />
                  {/* User */}
                </div>
              </Link>
            </li>
            <li className={employeecompo.rows}>
              <Link className={employeecompo.title} to="timetracker">
                <div className={employeecompo.icone}>
                  <img
                    id={employeecompo.home}
                    src={require("@photos/TIMETRACK.png")}
                    alt="icon"
                  />
                  <img src={require("@photos/timetrack.gif")} alt="icon" />
                  {/* User */}
                </div>
              </Link>
            </li>
            {/* <li className={employeecompo.rows}>
              <Link className={employeecompo.title} to="chartjs">
                <div className={employeecompo.icone}>
                  <img src={require("@photos/people.png")} alt="People" />
                  User
                </div>
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Employeecompo;
