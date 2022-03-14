import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appRef from "../../firebase";
// import appRef from "../../firebase";
import EmployeeaddPopup from "./EmployeeaddPopup";
import prodetail from "./projectdetail.module.scss";

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
                <h4>{project.projectTitle}</h4>
                <h5>Owner Name</h5>
                <h4>{project.clientName}</h4>
                <h5>Dead Line</h5>
                <h4>{project.timeLine}</h4>
                <h4></h4>
              </div>

              <div className={prodetail.aboutproject}>
                <div className={prodetail.heading}>
                  <h2>Project Description</h2>
                </div>
                <div className={prodetail.para}>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis laborum explicabo ut quisquam. Deleniti exercitationem vero modi alias eveniet, ratione porro deserunt ut, aspernatur enim, ipsum dignissimos voluptas aperiam esse!
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis laborum explicabo ut quisquam. Deleniti exercitationem vero modi alias eveniet, ratione porro deserunt ut, aspernatur enim, ipsum dignissimos voluptas aperiam esse!
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={prodetail.aboutteam}>
            <div className={prodetail.heading}>
              <h2>Team Member</h2>
              <div className={prodetail.addbtn}>
              <button
                onClick={() =>
                  navigate(`/layout/project/projectdetail/employeeadd/${id}`)
                }
              >
                +
              </button>
            </div>
            </div>
            <div>
              Name:hhhhhh <br />
              mono:mmmmmm <br />
              post:jjjjjj <br />
            </div>
          </div>


        </div>
      </div>
    </>
  );
};

export default Projectdetail;
