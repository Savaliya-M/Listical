import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appRef from "../../firebase";
// import prodetail from "./projectdetail.module.scss";

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
      <div>
        <div>
          <h1>project basic Detail</h1>
          <h2>{project.projectTitle}</h2>
          <h3>{project.clientName}</h3>
          <h4>{project.timeLine}</h4>
        </div>
        <div>
          <h1>Frontend Technoliogy Stack</h1>
          <h2>HTML5</h2>
          <h2>CSS</h2>
          <h2>JavaScript</h2>
          <h1>Backend Technoliogy Stack</h1>
          <h2>Programming languages : PHP</h2>
          <h2>Frameworks : Laravel</h2>
          <h2>Web Servers : Apache</h2>
          <h2>Databases : MySql</h2>
        </div>
        <div>
          <h1>Team Member</h1>
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

          {Object.values(team).map((id) => (
            <div key={id.uuid}>
              <h1> Name:{id.name}</h1> <br />
              <h3> mono:{id.mono} </h3>
              <br />
              <h3> post:{id.post} </h3>
              <br />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Projectdetail;
