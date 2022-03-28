import React from "react";
// import managercompo from './managercomp.module.scss';
import managercompo from "../Admin_components/admincompo.module.scss";
import { Link } from "react-router-dom";

const Managercompo = () => {
  return (
    <>
      <div className={managercompo.maindivsidebar}>
        <div className={managercompo.sidebar}>
          <ul className={managercompo.sidebarlist}>
            <li className={managercompo.rows}>
              <Link className={managercompo.title} to="/">
                <div className={managercompo.icone}>
                  <img src={require("@photos/house.png")} />
                  {/*   Home  */}
                </div>
              </Link>
            </li>
            <li className={managercompo.rows}>
              <Link className={managercompo.title} to="user">
                <div className={managercompo.icone}>
                  <img src={require("@photos/people.png")} alt="People" />
                  {/* User */}
                </div>
              </Link>
            </li>
            <li className={managercompo.rows}>
              <Link className={managercompo.title} to="project">
                <div className={managercompo.icone}>
                  <img src={require("@photos/project.png")} alt="" />
                  {/* Project */}
                </div>
              </Link>
            </li>
            <li className={managercompo.rows}>
              <Link className={managercompo.title} to="managerapproval">
                <div className={managercompo.icone}>
                  <img src={require("@photos/project.png")} alt="" />
                  {/* Project */}
                </div>
              </Link>
            </li>
            <li className={managercompo.rows}>
              <Link className={managercompo.title} to="timetracker">
                <div className={managercompo.icone}>
                  <img src={require("@photos/project.png")} alt="" />
                  {/* Project */}
                </div>
              </Link>
            </li>
            <li className={managercompo.rows}>
              <Link className={managercompo.title} to="chartjs">
                <div className={managercompo.icone}>
                  <img src={require("@photos/project.png")} alt="" />
                  {/* Project */}
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Managercompo;
