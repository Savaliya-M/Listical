import React from "react";
import admincompo from "./admincompo.module.scss";
import { Link } from "react-router-dom";

const Admincompo = () => {
  return (
    <>
      <div className={admincompo.maindivsidebar}>
        <div className={admincompo.sidebar}>
          <ul className={admincompo.sidebarlist}>
            <li className={admincompo.rows}>
              <Link className={admincompo.title} to="/">
                <div className={admincompo.icone} >
                  <img  id={admincompo.home} src={require("@photos/HOME.png")} alt="icon" />
                  <img src={require("@photos/home.gif")} alt="icon" />
                  {/* <Home  */}
                </div>
              </Link>
            </li>
            <li className={admincompo.rows}>
              <Link className={admincompo.title} to="user">
                <div className={admincompo.icone}>
                <img  id={admincompo.home} src={require("@photos/USERS.png")} alt="icon" />
                  <img src={require("@photos/users.gif")} alt="icon" />
                  {/* User */}
                </div>
              </Link>
            </li>
            <li className={admincompo.rows}>
              <Link className={admincompo.title} to="project">
                <div className={admincompo.icone}>
                <img  id={admincompo.home} src={require("@photos/PROJECTS.png")} alt="icon" />
                  <img src={require("@photos/projects.gif")} alt="icon" />
                  {/* Project */}
                </div>
              </Link>
            </li>
            <li className={admincompo.rows}>
              <Link className={admincompo.title} to="adapprovals">
                <div className={admincompo.icone}>
                <img  id={admincompo.home} src={require("@photos/APPROVEDS.png")} alt="icon" />
                  <img src={require("@photos/approved.gif")} alt="icon" />
                  {/* Approval */}
                </div>
              </Link>
            </li>
            {/* <li className={admincompo.rows}>
              <Link className={admincompo.title} to="chartjs">
                <div className={admincompo.icone}>
                  <img src={require("@photos/add-user6.png")} alt="" />
                  Approval
                </div>
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Admincompo;
