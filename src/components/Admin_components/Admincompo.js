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
                <div className={admincompo.icone}>
                  <img src={require("@photos/house.png")} alt="icon" />
                  {/* <Home  */}
                </div>
              </Link>
            </li>
            <li className={admincompo.rows}>
              <Link className={admincompo.title} to="user">
                <div className={admincompo.icone}>
                  <img src={require("@photos/people.png")} alt="People" />
                  {/* User */}
                </div>
              </Link>
            </li>
            <li className={admincompo.rows}>
              <Link className={admincompo.title} to="project">
                <div className={admincompo.icone}>
                  <img src={require("@photos/project.png")} alt="" />
                  {/* Project */}
                </div>
              </Link>
            </li>
            <li className={admincompo.rows}>
              <Link className={admincompo.title} to="adapprovals">
                <div className={admincompo.icone}>
                  <img src={require("@photos/project.png")} alt="" />
                  {/* Approval */}
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Admincompo;
