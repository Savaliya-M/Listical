import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appRef from "../../firebase";
// import appRef from "../../firebase";
import EmployeeaddPopup from "./EmployeeaddPopup";
// import prodetail from "./projectdetail.module.scss";

const Projectdetail = () => {
  const [users, setUsers] = useState({});
  // const [team, setTeam] = useState({});
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

  // useEffect(() => {
  //   Object.keys(project.empids).map((id) => {
  //     if (project.empids[id] === Object.values(users.uuid)) {
  //       console.log("done");
  //     }
  //   });
  // }, [project]);

  console.log(users);

  return (
    <>
      <div>
        <div>
          <h1>project basic Detail</h1>
          <h2>{project.projectTitle}</h2>
          <h3>{project.clientName}</h3>
          <h4>{project.timeLine}</h4>
          <h4></h4>
        </div>
        <div>
          <h1>project Description</h1>
        </div>
        <div>
          <h1>Team Member</h1>
          <button
            onClick={() =>
              navigate(`/layout/project/projectdetail/employeeadd/${id}`)
            }
          >
            +
          </button>
          <div>
            Name:hhhhhh <br />
            mono:mmmmmm <br />
            post:jjjjjj <br />
          </div>
        </div>
      </div>
    </>
  );
};

export default Projectdetail;
