import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appRef from "../../firebase";
// import appRef from "../../firebase";
import EmployeeaddPopup from "./EmployeeaddPopup";
import prodetail from "./projectdetail.module.scss";

const Projectdetail = () => {
  const [users, setUsers] = useState({});
  const [team, setTeam] = useState([]);
  const [project, setProject] = useState({});

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


          <div className={prodetail.aboutteam}>
            <div className={prodetail.heading}>
              <h2>Team Member</h2>
              <div className={prodetail.addbtn}>
                {localStorage.getItem("Type") === "Manager" ? (
                  <button
                    onClick={() =>
                      navigate(`/layout/project/projectdetail/employeeadd/${id}`)
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
