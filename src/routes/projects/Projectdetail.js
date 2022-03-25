import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appRef from "../../firebase";
import Addtask from "./Addtask";
import prodetail from "./projectdetail.module.scss";

const Projectdetail = () => {
  const [users, setUsers] = useState({});
  const [team, setTeam] = useState([]);
  const [project, setProject] = useState({});
  const [addTaskPopUp, setAddTaskPopUp] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      appRef.child(`Projects/${id}`).on("value", (snap) => {
        setProject(snap.val());
      });
    }
  }, [id]);

  useEffect(() => {
    appRef.child("Users").on("value", (snap) => {
      setUsers(snap.val());
    });
  }, []);

  useEffect(() => {
    if (project.empids && users) {
      let tempTeamArr = [];
      Object.keys(project.empids).map((uid) => {
        Object.keys(users).map((id) => {
          if (users[id].uuid === project.empids[uid]) {
            tempTeamArr.push(users[id]);
          }
        });
      });
      setTeam(tempTeamArr);
    }
  }, [project]);

  const acceptTask = (eid) => {
    Object.keys(project.TaskList).map((tid) => {
      if (eid === tid) {
        project.TaskList[tid].status = true;
      }
    });
    appRef.child(`Projects/${id}`).set(project);
  };

  const completeTask = (eid) => {
    Object.keys(project.TaskList).map((tid) => {
      if (eid === tid) {
        project.TaskList[tid].status = "Complete";
      }
    });
    appRef.child(`Projects/${id}`).set(project);
  };

  return (
    <>
      <div className={prodetail.all}>
        <div className={prodetail.alldetails}>
          <div className={prodetail.Progress}>
            <h1>Progress Bar</h1>
          </div>
          <div className={prodetail.rightside}>
            <div className={prodetail.graphs}>
              <img src={require("@photos/LineGraphs.jpg")} alt="" />
            </div>

            <div className={prodetail.prodetails}>
              <div className={prodetail.client}>
                <div className={prodetail.heading}>
                  <h2>Project Basic Detail</h2>
                </div>
                <h5>Poject Name</h5>
                <h2>{project.projectTitle}</h2>
                <h5>Owner Name</h5>
                <h3>{project.clientName}</h3>
                <h5>Dead Line</h5>
                <h4>{project.timeLine}</h4>
              </div>

              <div className={prodetail.aboutproject}>
                <div className={prodetail.heading}>
                  <h2>Project Description</h2>
                </div>
                <div className={prodetail.para}>
                  <div>
                    <h5>Frontend Technology</h5>
                    <h3> Html - CSS - JavaScript</h3>
                  </div>
                  <div>
                    <h5>Backend Technology</h5>
                    <h3> Programing lan. - PHP</h3>
                    <h3>Framwork - Laravel</h3>
                    <h3>Web Servers - Apache</h3>
                    <h3>Database - Mysql</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ---------------------------------------------------------------------------------------------------------------------------------           */}
          <div>
            <div>
              {addTaskPopUp ? (
                <Addtask
                  pid={id}
                  pdetail={project}
                  users={users}
                  handleclose={() => setAddTaskPopUp(!addTaskPopUp)}
                />
              ) : (
                ""
              )}
              {localStorage.getItem("Type") === "Manager" ? (
                <button onClick={() => setAddTaskPopUp(!addTaskPopUp)}>
                  Add Task
                </button>
              ) : (
                <></>
              )}

              <table border="1">
                <thead>
                  <tr>
                    <th> Task Name </th>
                    <th> Employee Name </th>
                    <th> Status </th>
                    <th> Priority </th>
                    <th> Astimated Time In Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {localStorage.getItem("Type") === "Manager" ||
                  localStorage.getItem("Type") === "Admin"
                    ? project.TaskList
                      ? Object.keys(project.TaskList).map((tid) => (
                          <tr key={tid}>
                            <td>{project.TaskList[tid].taskName}</td>

                            {Object.values(users).map((uid) => {
                              if (uid.uuid === project.TaskList[tid].empId) {
                                return <td>{uid.name}</td>;
                              }
                            })}

                            <td>
                              {project.TaskList[tid].status === false
                                ? "Pending"
                                : project.TaskList[tid].status === true
                                ? "On Progress"
                                : "Completed"}
                            </td>
                            <td>{project.TaskList[tid].priority}</td>
                            <td>{project.TaskList[tid].astimatedTime}</td>
                          </tr>
                        ))
                      : ""
                    : ""}
                  {/* -------------------------------- */}

                  {localStorage.getItem("Type") === "Employee"
                    ? project.TaskList
                      ? Object.keys(project.TaskList).map((tid) => {
                          if (
                            project.TaskList[tid].empId ===
                            localStorage.getItem("uuid")
                          ) {
                            console.log(project.TaskList[tid]);
                            return (
                              <tr key={tid}>
                                <td>{project.TaskList[tid].taskName}</td>

                                {Object.values(users).map((uid) => {
                                  if (
                                    uid.uuid === project.TaskList[tid].empId
                                  ) {
                                    return <td>{uid.name}</td>;
                                  } else {
                                    <></>;
                                  }
                                })}

                                <td>
                                  {project.TaskList[tid].status === false
                                    ? "Pending"
                                    : project.TaskList[tid].status === true
                                    ? "On Progress"
                                    : "Completed"}
                                </td>
                                <td>{project.TaskList[tid].priority}</td>
                                <td>{project.TaskList[tid].astimatedTime}</td>
                                {project.TaskList[tid].status === false ? (
                                  <td>
                                    <button onClick={() => acceptTask(tid)}>
                                      Accept
                                    </button>
                                  </td>
                                ) : project.TaskList[tid].status === true ? (
                                  <td>
                                    <button onClick={() => completeTask(tid)}>
                                      Complete
                                    </button>
                                  </td>
                                ) : project.TaskList[tid].status ===
                                  "Complete" ? (
                                  <td>🎉</td>
                                ) : (
                                  <td></td>
                                )}
                              </tr>
                            );
                          } else {
                            return <></>;
                          }
                        })
                      : ""
                    : ""}
                </tbody>
              </table>
            </div>
          </div>
          {/* ---------------------------------------------------------------------------------------------------------------------------------           */}
          <div className={prodetail.aboutteam}>
            <div className={prodetail.heading}>
              <h2>Team Member</h2>
              <div className={prodetail.addbtn}>
                {localStorage.getItem("Type") === "Manager" ? (
                  <button
                    onClick={() =>
                      navigate(
                        `/layout/project/projectdetail/employeeadd/${id}`
                      )
                    }
                  >
                    +
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className={prodetail.team}>
              {Object.values(team).map((id) => (
                <div key={id.uuid} className={prodetail.teammember}>
                  <div className={prodetail.names}>
                    <h3>Name</h3>
                    <h2>{id.name}</h2>
                  </div>
                  <div className={prodetail.mono}>
                    <h3>Mobile No.</h3>
                    <h2>{id.mono} </h2>
                  </div>
                  <div className={prodetail.post}>
                    <h3>Post</h3>
                    <h2>{id.post} </h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Projectdetail;
