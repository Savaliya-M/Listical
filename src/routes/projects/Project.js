import React, { useState, useEffect } from "react";
import proj from "./project.module.scss";
import procomp from "./projectcompo.module.scss";
import Addprojectpopup from "./Addprojectpopup";
import appRef from "../../firebase";
import { useNavigate } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Charttemp from "./Charttemp";
ChartJS.register(ArcElement, Tooltip, Legend);

const Project = () => {
  const [proPopUp, setProPopUp] = useState(false);
  const [projects, setProjects] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    appRef.child("Projects").on("value", (snap) => {
      setProjects(snap.val());
    });
  }, []);

  const togglepopup = () => {
    setProPopUp(!proPopUp);
  };
  return (
    <>
      <div className={proj.wraperproject}>
        {localStorage.getItem("Type") === "Admin" ? (
          <div>
            <div className={proj.btn}>
              <button className={proj.bton} onClick={togglepopup}>
                ADD PROJECT
              </button>
            </div>
            <div className={proj.mainproject}>
              {Object.keys(projects).map((id) => (
                <div
                  className={procomp.mainprojectcompo}
                  id={procomp.Projectdetail}
                  key={id}
                  onClick={() => {
                    navigate(`projectdetail/${id}`);
                  }}
                >
                  <div className={procomp.probox}>
                    <div className={procomp.progressreport}>
                      <div id={procomp.chart}>
                        <Charttemp project={projects[id]} />
                      </div>
                    </div>
                    <div className={proj.proinfo}>
                      <div className={proj.proname}>
                        <h5>Project Name</h5>
                        <h4>{projects[id].projectTitle}</h4>
                      </div>
                      <div className={proj.clientname}>
                        <h5>Client Name</h5>
                        <h4>{projects[id].clientName} </h4>
                      </div>
                      <div className={proj.deadline}>
                        <h5>Deadline</h5>
                        <h4>{projects[id].timeLine}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : localStorage.getItem("Type") === "Manager" ? (
          <div className={proj.mainproject}>
            {Object.keys(projects).map((id) => {
              if (projects[id].managerid === localStorage.getItem("uuid")) {
                return (
                  <div
                    className={procomp.mainprojectcompo}
                    id={procomp.Projectdetail}
                    key={id}
                    onClick={() => {
                      navigate(`projectdetail/${id}`);
                    }}
                  >
                    <div className={procomp.probox}>
                      <div className={procomp.progressreport}>
                        <div id={procomp.chart}>
                          <Charttemp project={projects[id]} />
                        </div>
                      </div>
                      <div className={proj.proinfo}>
                        <div className={proj.proname}>
                          <h5>Project Name</h5>
                          <h4>{projects[id].projectTitle}</h4>
                        </div>
                        <div className={proj.clientname}>
                          <h5>Client Name</h5>
                          <h4>{projects[id].clientName} </h4>
                        </div>
                        <div className={proj.deadline}>
                          <h5>Deadline</h5>
                          <h4>{projects[id].timeLine}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return <></>;
              }
            })}
          </div>
        ) : localStorage.getItem("Type") === "Employee" ? (
          <div>
            <div className={proj.mainproject}>
              {Object.keys(projects).map((pid) => {
                if (projects[pid].empids && projects[pid].empids.length) {
                  return Object.values(projects[pid].empids).map((id) => {
                    if (id === localStorage.getItem("uuid")) {
                      return (
                        <>
                          <div
                            className={procomp.mainprojectcompo}
                            id={procomp.Projectdetail}
                            key={id}
                            onClick={() => {
                              navigate(`projectdetail/${pid}`);
                            }}
                          >
                            <div className={procomp.probox}>
                              <div className={procomp.progressreport}>
                                <div id={procomp.chart}>
                                  <Charttemp project={projects[pid]} />
                                </div>
                              </div>
                              <div className={proj.proinfo}>
                                <div className={proj.proname}>
                                  <h5>Project Name:</h5>
                                  <h4>{projects[pid].projectTitle}</h4>
                                </div>
                                <div className={proj.clientname}>
                                  <h5>Client Name:</h5>
                                  <h4>{projects[pid].clientName} </h4>
                                </div>
                                <div className={proj.deadline}>
                                  <h5>Deadline:</h5>
                                  <h4>{projects[pid].timeLine}</h4>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    }
                  });
                }
              })}
            </div>
          </div>
        ) : (
          ""
        )}

        {proPopUp && <Addprojectpopup handleclose={togglepopup} />}
      </div>
    </>
  );
};

export default Project;
