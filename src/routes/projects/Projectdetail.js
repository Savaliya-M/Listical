import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { useNavigate, useParams } from "react-router-dom";
import appRef from "../../firebase";
import Addtask from "./Addtask";
import prodetail from "./projectdetail.module.scss";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import AddproDesc from "./AddproDesc";

ChartJS.register(ArcElement, Tooltip, Legend);
const Projectdetail = () => {
  const [users, setUsers] = useState({});
  const [team, setTeam] = useState([]);
  const [project, setProject] = useState({});
  const [task, setTask] = useState({});
  const [chartData, setChartData] = useState("");
  const [addTaskPopUp, setAddTaskPopUp] = useState(false);
  const [addDescPopUp, setAddDescPopUp] = useState(false);

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
  }, [project, users]);

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
  useEffect(() => {
    let tempCompleted = [];
    let tempProgress = [];
    let tempPanding = [];
    let tempHigh = [];
    let tempMedium = [];
    let tempLow = [];
    // console.log("project.TaskList", project.TaskList);
    if (project.TaskList && project.TaskList.length !== 0) {
      tempCompleted = Object.values(project.TaskList).filter((tid) => {
        if (tid.status === "Complete") {
          console.log("tid", tid.status);
          return true;
        }
      });
      tempProgress = Object.values(project.TaskList).filter((tid) => {
        if (tid.status === true) {
          console.log("tid", tid.status);
          return true;
        }
      });
      tempPanding = Object.values(project.TaskList).filter((tid) => {
        if (tid.status === false) {
          console.log("tid", tid.status);
          return true;
        }
      });
      tempHigh = Object.values(project.TaskList).filter((tid) => {
        if (tid.priority === "High") {
          console.log("tid", tid.priority);
          return true;
        }
      });
      tempMedium = Object.values(project.TaskList).filter((tid) => {
        if (tid.priority === "Medium") {
          console.log("tid", tid.priority);
          return true;
        }
      });
      tempLow = Object.values(project.TaskList).filter((tid) => {
        if (tid.priority === "Low") {
          console.log("tid", tid.priority);
          return true;
        }
      });
    }
    const pieData = {
      labels: ["Completed", "Progress", "Panding", "High", "Medium", "Low"],
      datasets: [
        {
          label: "chart1",
          labels: ["Completed", "Progress", "Panding"],
          data: [
            tempCompleted.length,
            tempProgress.length,
            tempPanding.length,
            0,
            0,
            0,
          ],
          backgroundColor: ["green", "yellow", "red"],
        },
        {
          label: "chart2",
          data: [tempHigh.length, tempMedium.length, tempLow.length],
          backgroundColor: ["cyan", "pink", "black"],
        },
      ],
    };
    setChartData(pieData);
    console.log(tempCompleted);
    console.log(tempProgress);
    console.log(tempPanding);
  }, [project]);

  return (
    <>
      <div className={prodetail.all}>
        <div className={prodetail.alldetails}>

          <div className={prodetail.rightside}>
            <div className={prodetail.graphs}>
            <div className={prodetail.Progress}>
                <h1>Progress Bar</h1>
              </div>
              {/* <img src={require("@photos/LineGraphs.jpg")} alt="" /> */}
              {/* <img src={require("@photos/LineGraphs.jpg")} alt="" /> */}
              {chartData !== "" ? <Doughnut data={chartData} /> : null}
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
              {addDescPopUp ? (
                <AddproDesc
                  pid={id}
                  handleclose={() => setAddDescPopUp(!addDescPopUp)}
                />
              ) : (
                ""
              )}
              <div className={prodetail.aboutproject}>
                <div className={prodetail.heading}>
                  <h2>Project Description</h2>
                  {localStorage.getItem("Type") === "Manager" ? (
                    <button onClick={() => setAddDescPopUp(!addDescPopUp)}>
                      Add desc
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
                <div className={prodetail.para}>
                  <div>
                    <h5>Frontend Technology</h5>
                    {project.frontEnd
                      ? Object.values(project.frontEnd).map((id) => (
                          <h3 key={id}> {id} </h3>
                        ))
                      : ""}
                  </div>
                  <div>
                    {project.backEnd ? (
                      <>
                        <h5>Backend Technology</h5>
                        <h3> Programing lan. - {project.backEnd.prolang}</h3>
                        <h3>Framwork - {project.backEnd.framework}</h3>
                        <h3>Web Servers - {project.backEnd.webserver}</h3>
                        <h3>Database - {project.backEnd.database}</h3>
                      </>
                    ) : (
                      ""
                    )}
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

              <table border="0">
                <thead>
                  <tr>
                    <th><h3>Task Name</h3></th>
                    <th><h3>Employee Name</h3></th>
                    <th><h3>Status</h3></th>
                    <th><h3>Priority</h3></th>
                    <th><h3>Astimated Time</h3></th>
                    <th><h3>Postion</h3></th>
                  </tr>
                </thead>
                <tbody className={prodetail.tableline}>
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
                              <td>{project.TaskList[tid].astimatedTime} Hr</td>
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
