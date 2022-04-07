import React, { useState, useEffect } from "react";
import useinfo from "./userinfo.module.scss";
import { Link, useNavigate } from "react-router-dom";
import appRef from "../../../firebase";
import { useParams } from "react-router-dom";
import Salary from "./Salary";
import { v4 as uuidv4 } from "uuid";

const Userinfo = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState({});
  const [langknow, setLangknow] = useState([]);
  const [skill, setSkill] = useState([]);
  const { id } = useParams();
  const [projects, setProjects] = useState({});
  const [userProjects, setUserProjects] = useState([]);
  const [salaryPage, setSalaryPage] = useState(false);

  useEffect(() => {
    appRef.child(`Users/${id}`).on("value", (snapshot) => {
      setUser(snapshot.val());
    });

    appRef.child("Projects").on("value", (snap) => {
      setProjects(snap.val());
    });
  }, [id]);

  useEffect(() => {
    if (user.langknown) {
      setLangknow(Object.values(user.langknown));
    }
    if (user.skill) {
      setSkill(user.skill);
    }
  }, [user]);

  useEffect(() => {
    if (projects) {
      let tempProjects = [];
      Object.keys(projects).map((pid) => {
        if (user.position === "Employee" && projects[pid].empids) {
          Object.values(projects[pid].empids).map((eid) => {
            if (eid === user.uuid) {
              tempProjects.push(projects[pid]);
            }
            return eid;
          });
        }
        if (user.position === "Manager" && projects[pid].managerid) {
          if (user.uuid === projects[pid].managerid) {
            tempProjects.push(projects[pid]);
          }
        }
        return pid;
      });
      setUserProjects(tempProjects);
    }
  }, [projects, user]);

  const openSalary = () => {
    setSalaryPage(!salaryPage);
  };
  return (
    <>
      {salaryPage ? (
        <Salary closeSalary={openSalary} id={user.uuid} usalary={user.salary} />
      ) : (
        <div className={useinfo.mainuserinfo}>
          <div className={useinfo.secuserinfo}>
            <div className={useinfo.closebtn}>
              <button
                className={useinfo.closebtn1}
                onClick={() => {
                  navigate(-1);
                }}
              >
                X
              </button>
              {user.uuid === localStorage.getItem("uuid") ? (
                <button
                  className={useinfo.closebtn2}
                  onClick={() => navigate(`/layout/user/editdetail/${id}`)}
                >
                  <img src={require("@photos/edit(1).png")} alt="edit" />
                </button>
              ) : (
                <></>
              )}
            </div>
            <div className={useinfo.thirduserinfo}>
              <div className={useinfo.basicdetail}>
                <div className={useinfo.card}>
                  <div className={useinfo.personimage}>
                    <img src={require("@photos/man.png")} alt="person" />
                  </div>
                  <div className={useinfo.usercard}>
                    <div className={useinfo.cardinfo}>
                      <h1>{user.name}</h1>
                      <p>{`${user.position}`}</p>
                      <div className={useinfo.cardinfo}>
                        <img src={require("@photos/Wcoding.png")} alt="skill" />
                        {user.role}
                      </div>
                      <div className={useinfo.cardinfo}>
                        <img src={require("@photos/Wcall.png")} alt="skill" />
                        +91 {user.mono}
                      </div>
                      <div className={useinfo.cardinfo}>
                        <img src={require("@photos/Wemail.png")} alt="skill" />
                        {user.email}
                      </div>
                    </div>
                    <div onClick={useinfo.open} className={useinfo.userbtn}>
                      <div className={useinfo.btnpersonal}>
                        <button className={useinfo.cardbtn}>
                          {" "}
                          <a href="#personalinfo">
                            <b>Information</b>
                          </a>{" "}
                        </button>
                      </div>
                      <div className={useinfo.qualification}>
                        <button className={useinfo.cardbtn}>
                          {" "}
                          <a href="#QualificationSkill">
                            <b>Qualification & Skill</b>
                          </a>{" "}
                        </button>
                      </div>
                      <div className={useinfo.work}>
                        <button className={useinfo.cardbtn}>
                          {" "}
                          <a href="#experiances">
                            <b>Experiance</b>
                          </a>{" "}
                        </button>
                      </div>
                      <div className={useinfo.Projects}>
                        <button className={useinfo.cardbtn}>
                          {" "}
                          <a href="#Projects">
                            <b>Projects</b>
                          </a>{" "}
                        </button>
                      </div>
                      {localStorage.getItem("Type") === "Admin" ||
                      localStorage.getItem("Type") === "Manager" ||
                      localStorage.getItem("uuid") === user.uuid ? (
                        <div className={useinfo.Projects}>
                          {/* <>Salary</a> */}
                          {/* <Link exact to={`/layout/user/salary/${user.uuid}`}>
                            Salary
                          </Link> */}
                          <button className={useinfo.cardbtn} onClick={openSalary}><b>Salary</b> </button>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>

                <div className={useinfo.detailtext}>
                  <div className={useinfo.prinfo} id="personalinfo">
                    <div className={useinfo.title1}>
                      <h2>Personal Information</h2>
                    </div>
                    <div className={useinfo.info}>
                      <div className={useinfo.infolist}>
                        <h4>Name</h4>
                        <h3>{user.name}</h3>
                      </div>
                      {/* <div className={useinfo.infolist}>
                      <h4>Post/Skill</h4>
                      <h3>{user.post}</h3>
                    </div> */}
                      <div className={useinfo.infolist}>
                        <h4>Mobile No.</h4>
                        <h3>{user.mono}</h3>
                      </div>
                      <div className={useinfo.infolist}>
                        <h4>Email ID</h4>
                        <h3>{user.email}</h3>
                      </div>
                      {/* <div className={useinfo.infolist}>
                      <h4>Degree</h4>
                      <h3>{user.degree}</h3>
                    </div> */}
                    </div>
                  </div>

                  <div id="QualificationSkill" className={useinfo.Qskill}>
                    <div className={useinfo.title2}>
                      <h2>Qualification & Skill</h2>
                    </div>
                    <div className={useinfo.info2}>
                      <div className={useinfo.infolist2}>
                        <h4>Degree</h4>
                        <h3>{user.degree}</h3>
                      </div>
                      <div className={useinfo.infolist2}>
                        <h4>Collage</h4>
                        <h3>{user.colname}</h3>
                      </div>
                      <div className={useinfo.infolist2}>
                        <h4>Language Known</h4>
                        <h3>
                          {langknow.map((elem) => {
                            if (elem !== "") {
                              <li key={elem}>
                                {elem}
                                <br />
                              </li>;
                            }
                            return elem;
                          })}
                        </h3>
                      </div>
                      <div className={useinfo.scrollname}>
                        <h4>Skill</h4>
                        <div id={useinfo.list} className={useinfo.infolist2}>
                          <h3>
                            {skill.map((elem) => (
                              <li key={elem}>{elem}</li>
                            ))}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div id="experiances" className={useinfo.experiances}>
                    <div className={useinfo.title3}>
                      <h2>WORK EXPERIENCE</h2>
                    </div>
                    <div className={useinfo.info3}>
                      <div className={useinfo.infolist3}>
                        <h4>Post</h4>
                        <h3>{user.post} </h3>
                      </div>
                      <div className={useinfo.infolist3}>
                        <h4>Company</h4>
                        <h3>{user.precompany}</h3>
                      </div>
                      <div className={useinfo.infolist3}>
                        <h4>Duration</h4>
                        <h3>{user.preworkduration}</h3>
                      </div>
                      <div className={useinfo.empwordsscroll}>
                        <h4>Employee Words</h4>
                        <div
                          id={useinfo.empwords}
                          className={useinfo.infolist3}
                        >
                          <h3>{user.otherdetail}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div id="Projects" className={useinfo.allProjects}>
                <div className={useinfo.title4}>
                  <h2>All projects worked By :- {user.name}</h2>
                  {/* <div className={useinfo.managername}>
                  <h3>Managed by : Rahulkumar</h3>
                </div> */}
                </div>

                <div className={useinfo.fiterprouwise}>
                  {/* <div className={useinfo.filbtn}>
                  <button>Runing</button>
                  <button>Completed</button>
                  <button>Pending</button>
                </div> */}
                </div>
                <div className={useinfo.projectbox}>
                  {userProjects.length ? (
                    Object.values(userProjects).map((data) => (
                      <div key={uuidv4()} className={useinfo.projectwise}>
                        <div className={useinfo.protitle}>
                          <h3>{data.projectTitle}</h3>
                        </div>
                        <h3>{data.clientName}</h3>
                        <h4>{data.timeLine}</h4>
                      </div>
                    ))
                  ) : (
                    <h1>Not any Projects for display </h1>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Userinfo;
