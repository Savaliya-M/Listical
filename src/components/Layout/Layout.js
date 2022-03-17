import React, { useEffect, useState } from "react";
import layout from "./layout.module.scss";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Routes, Route } from "react-router-dom";
import Home from "@home/Home";
import User from "@user/User";
import Project from "@projects/Project";
import appRef from "../../firebase";
import Adminapproval from "../../routes/Approvals/Adminapproval";
import Projectdetail from "../../routes/projects/Projectdetail";
import EmployeeaddPopup from "../../routes/projects/EmployeeaddPopup";
import Employeeapproval from "../../routes/Approvals/Employeeapproval";
import Managerapproval from "../../routes/Approvals/Managerapproval";

const Layout = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    appRef.child("Users").on("value", (snapshot) => {
      const userData = snapshot.val();
      Object.values(userData).forEach((elem) => {
        if (elem.uuid === localStorage.getItem("uuid")) {
          setUser(elem);
        }
      });
    });
  }, []);

  return (
    <>
      <div className={layout.mainlayout}>
        <div className="sidebar">
          <Sidebar type={user.position} />
        </div>
        <div className={layout.navbar}>
          <Navbar name={user.name} />
        </div>
        <div className={layout.routes}>
          {user.position === "Admin" ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route exact path="user/*" element={<User user={user} />} />
              <Route exact path="project/*" element={<Project />} />
              <Route exact path="adapprovals" element={<Adminapproval />} />
              <Route
                exact
                path="project/projectdetail/:id"
                element={<Projectdetail />}
              />
            </Routes>
          ) : (
            ""
          )}
          {user.position === "Manager" ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route exact path="user/*" element={<User />} />
              <Route exact path="project/*" element={<Project />} />
              <Route
                exact
                path="project/projectdetail/:id"
                element={<Projectdetail />}
              />
              <Route
                exact
                path="project/projectdetail/employeeadd/:id"
                element={<EmployeeaddPopup />}
              />
              <Route
                exact
                path="managerapproval"
                element={<Managerapproval name={user.name} />}
              />
            </Routes>
          ) : (
            ""
          )}
          {user.position === "Employee" ? (
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route exact path="user/*" element={<User />} /> */}
              <Route exact path="project" element={<Project />} />
              <Route
                exact
                path="employeeapproval"
                element={<Employeeapproval name={user.name} />}
              />
              <Route
                exact
                path="project/projectdetail/:id"
                element={<Projectdetail />}
              />
            </Routes>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Layout;
