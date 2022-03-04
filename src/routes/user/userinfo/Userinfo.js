<<<<<<< HEAD
import React from "react";
import { useNavigate} from "react-router-dom";
import useinfo from "./userinfo.module.scss";
=======
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appRef from "../../../firebase";
import "./userinfo.css";
>>>>>>> a77f2875bc9b8212291e4da7810cb4d3f388acaf

const Userinfo = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState({});
  const { id } = useParams();
  useEffect(() => {
    appRef.child(`Users/${id}`).on("value", (snapshot) => {
      setUser(snapshot.val());
    });
  }, []);
  useEffect(() => {
    console.log(user);
  }, [user]);
  const { langknown } = user;

  return (
    <>
<<<<<<< HEAD
      <div className={useinfo.mainuserinfo}>
        <div className={useinfo.secuserinfo}>
          <button onClick={()=>{navigate("/layout/user")}}>Back</button>
          <div className={useinfo.thirduserinfo}>
            <div className={useinfo.basicdetail}>
              <div className={useinfo.detailtext}>
                <h1>MAYURKUMAR BHARATBHAI PATEL</h1>
                <p>Backend Devloper</p>
                <p>9865327845</p>
                <p>mkdpatel.tech.19@gmail.com</p>
                <h4>M.C.A(L.D. College From Ahemdabad)</h4>
                <div className={useinfo.workexperience}>
                <h3>WORK EXPERIENCE</h3>
                <h4>Node.js Developer </h4>
                <h5>Tech Infotech </h5>
                <p>Till - 01/2021</p>
                 <p> Tech INFOTECH is one of the Reckoned IT Solution Provider Company.</p>
                 <ul>
                   <li>Implemented REST APIs for Company's Products.</li>
                   <li>Handle AWS-S3 file management.</li>
                   <li>Create complex MongoDB Queries using mongoose. </li>
                   <li>Make use of crucial libraries of npm like socket.io,</li>
                   <li>passport, JWT and many other.</li>
                   <li>Worked with Redis and FFmpeg for client's Project.</li>
                   <li>Being part of team for system design,project planning and management.</li>
                   <li>Wokred in GitLab Environment.</li>
                  </ul>
                  </div>
                <div className={useinfo.btnsalary}>
=======
      <div className="mainuserinfo">
        <div className="secuserinfo">
          <button
            onClick={() => {
              navigate("/layout/user");
            }}
          >
            Back
          </button>
          <div className="thirduserinfo">
            <div className="basicdetail">
              <div className="detailtext">
                <h1>{user.name}</h1>
                <p>{user.post}</p>
                <p>{user.mono}</p>
                <p>{user.email}</p>
                <h4>
                  {user.degree}({user.colname})
                </h4>
                <div className="work-experience">
                  <h3>WORK EXPERIENCE</h3>
                  <h4>Node.js Developer </h4>
                  <h5>{user.precompany}</h5>
                  <p>{user.preworkduration}</p>
                  <p>{user.otherdetail}</p>
                  {/* <ul>
                    <li>Implemented REST APIs for Company's Products.</li>
                    <li>Handle AWS-S3 file management.</li>
                    <li>Create complex MongoDB Queries using mongoose. </li>
                    <li>
                      Make use of crucial libraries of npm like socket.io,
                    </li>
                    <li>passport, JWT and many other.</li>
                    <li>Worked with Redis and FFmpeg for client's Project.</li>
                    <li>
                      Being part of team for system design,project planning and
                      management.
                    </li>
                    <li>Wokred in GitLab Environment.</li>
                  </ul> */}
                  <h3>Language Known</h3>
                </div>
                <div className="btnsalary">
>>>>>>> a77f2875bc9b8212291e4da7810cb4d3f388acaf
                  <button>Salary</button>
                </div>
              </div>
              <div className={useinfo.personimage}>
                <img src={require("@photos/person.jpg")} alt="person" />
              </div>
            </div>

            <div className={useinfo.managername}>
              <h3>Managed by : Rahulkumar</h3>
            </div>

            <div className={useinfo.fiterprouwise}>
              <div className={useinfo.filbtn}>
                <button>Runing</button>
                <button>Completed</button>
                <button>Pending</button>
              </div>
            </div>

            <div className={useinfo.projectbox}>
              <div className={useinfo.projectwise}>
                <h1>LMS</h1>
                <p>manish shah</p>
                <p>Creted Backend for LMS</p>
                <p>starting date: 12-10-2022</p>
                <p>ending date: 13-10-2022</p>
              </div>
              <div className={useinfo.projectwise}>
                <h1>LMS</h1>
                <p>manish shah</p>
                <p>Creted Backend for LMS</p>
                <p>starting date: 12-10-2022</p>
                <p>ending date: 13-10-2022</p>
              </div>
              <div className={useinfo.projectwise}>
                <h1>LMS</h1>
                <p>manish shah</p>
                <p>Creted Backend for LMS</p>
                <p>starting date: 12-10-2022</p>
                <p>ending date: 13-10-2022</p>
              </div>
              <div className={useinfo.projectwise}>
                <h1>LMS</h1>
                <p>manish shah</p>
                <p>Creted Backend for LMS</p>
                <p>starting date: 12-10-2022</p>
                <p>ending date: 13-10-2022</p>
              </div>
              <div className={useinfo.projectwise}>
                <h1>LMS</h1>
                <p>manish shah</p>
                <p>Creted Backend for LMS</p>
                <p>starting date: 12-10-2022</p>
                <p>ending date: 13-10-2022</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Userinfo;
