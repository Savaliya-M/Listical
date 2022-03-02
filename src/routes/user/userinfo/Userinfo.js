import React from "react";
import { useNavigate} from "react-router-dom";
import "./userinfo.css";

const Userinfo = () => {
  let navigate = useNavigate();
  const clickuser = () =>{
    return navigate("/admincompo/user");
  }
  return (
    <>
      <div className="mainuserinfo">
        <div className="secuserinfo">
          <button onClick={clickuser}>Back</button>
          <div className="thirduserinfo">
            <div className="basicdetail">
              <div className="detailtext">
                <h1>MAYURKUMAR BHARATBHAI PATEL</h1>
                <p>Backend Devloper</p>
                <p>9865327845</p>
                <p>mkdpatel.tech.19@gmail.com</p>
                <h4>M.C.A(L.D. College From Ahemdabad)</h4>
                <div className="work-experience">
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
                <div className="btnsalary">
                  <button>Salary</button>
                </div>
              </div>
              <div className="personimage">
                <img src={require("@photos/person.jpg")} alt="person" />
              </div>
            </div>

            <div className="managername">
              <h3>Managed by : Rahulkumar</h3>
            </div>

            <div className="fiterprouwise">
              <div className="filbtn">
                <button>Runing</button>
                <button>Completed</button>
                <button>Pending</button>
              </div>
            </div>

            <div className="projectbox">
              <div className="projectwise">
                <h1>LMS</h1>
                <p>manish shah</p>
                <p>Creted Backend for LMS</p>
                <p>starting date: 12-10-2022</p>
                <p>ending date: 13-10-2022</p>
              </div>
              <div className="projectwise">
                <h1>LMS</h1>
                <p>manish shah</p>
                <p>Creted Backend for LMS</p>
                <p>starting date: 12-10-2022</p>
                <p>ending date: 13-10-2022</p>
              </div>
              <div className="projectwise">
                <h1>LMS</h1>
                <p>manish shah</p>
                <p>Creted Backend for LMS</p>
                <p>starting date: 12-10-2022</p>
                <p>ending date: 13-10-2022</p>
              </div>
              <div className="projectwise">
                <h1>LMS</h1>
                <p>manish shah</p>
                <p>Creted Backend for LMS</p>
                <p>starting date: 12-10-2022</p>
                <p>ending date: 13-10-2022</p>
              </div>
              <div className="projectwise">
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
