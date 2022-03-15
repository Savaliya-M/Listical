import React, { useState, useEffect } from "react";
import proj from "./project.module.scss";
import Addprojectpopup from "./Addprojectpopup";
import procomp from "./projectcompo.module.scss";
import appRef from "../../firebase";
import { useNavigate } from "react-router-dom";

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
                      <img
                        src={require("@photos/peichart.jpg")}
                        alt="this is pie chart"
                      />
                    </div>
                    <div className={procomp.proinfo}>
                      <div className={procomp.proname}>
                        <h3>Project Name:</h3>
                        <h3>{projects[id].projectTitle}</h3>
                      </div>
                      <div className={procomp.clientname}>
                        <h4>Client Name:</h4>
                        <h4>{projects[id].clientName} </h4>
                      </div>
                      <div className={procomp.deadline}>
                        <h4>Deadline:</h4>
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
                        <img
                          src={require("@photos/peichart.jpg")}
                          alt="this is pie chart"
                        />
                      </div>
                      <div className={procomp.proinfo}>
                        <div className={procomp.proname}>
                          <h3>Project Name:</h3>
                          <h3>{projects[id].projectTitle}</h3>
                        </div>
                        <div className={procomp.clientname}>
                          <h4>Client Name:</h4>
                          <h4>{projects[id].clientName} </h4>
                        </div>
                        <div className={procomp.deadline}>
                          <h4>Deadline:</h4>
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
          // <div>
          //   <div className={proj.mainproject}>
          //     {Object.values(projects).map((pid) => {
          //       if (pid.empids && pid.empids.length) {
          //         return Object.values(pid.empids).map((id) => {
          //           if (id === localStorage.getItem("uuid")) {
          //             return (
          //               <>
          //                 <div
          //                   className={procomp.mainprojectcompo}
          //                   id={procomp.Projectdetail}
          //                   key={id}
          //                   onClick={() => {
          //                     navigate(`projectdetail/${pid}`);
          //                   }}
          //                 >
          //                   <div className={procomp.probox}>
          //                     <div className={procomp.progressreport}>
          //                       <img
          //                         src={require("@photos/peichart.jpg")}
          //                         alt="this is pie chart"
          //                       />
          //                     </div>
          //                     <div className={procomp.proinfo}>
          //                       <div className={procomp.proname}>
          //                         <h3>Project Name:</h3>
          //                         <h3>{pid.projectTitle}</h3>
          //                       </div>
          //                       <div className={procomp.clientname}>
          //                         <h4>Client Name:</h4>
          //                         <h4>{pid.clientName} </h4>
          //                       </div>
          //                       <div className={procomp.deadline}>
          //                         <h4>Deadline:</h4>
          //                         <h4>{pid.timeLine}</h4>
          //                       </div>
          //                     </div>
          //                   </div>
          //                 </div>
          //               </>
          //             );
          //           }
          //         });
          //       }
          //     })}
          //   </div>
          // </div>
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
                                <img
                                  src={require("@photos/peichart.jpg")}
                                  alt="this is pie chart"
                                />
                              </div>
                              <div className={procomp.proinfo}>
                                <div className={procomp.proname}>
                                  <h3>Project Name:</h3>
                                  <h3>{projects[pid].projectTitle}</h3>
                                </div>
                                <div className={procomp.clientname}>
                                  <h4>Client Name:</h4>
                                  <h4>{projects[pid].clientName} </h4>
                                </div>
                                <div className={procomp.deadline}>
                                  <h4>Deadline:</h4>
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
// <>
//   <h1>{pid.projectTitle}</h1>
// </>

// <></>
