import React, { useState, useEffect } from "react";
import appRef from "../../firebase";
import addpropop from "./addprojectpopup.module.scss";

const Addprojectpopup = (props) => {
  const [projectDetail, setProjectDetail] = useState({
    projectTitle: "",
    clientName: "",
    timeLine: "",
    managerid: {},
  });
  const [usersData, setUsersData] = useState({});
  const [dropDownManager, setDropDownManager] = useState([]);

  useEffect(() => {
    appRef.child("Users").on("value", (snap) => {
      setUsersData(snap.val());
    });
  }, []);

  useEffect(() => {
    let tempdropDownManager = [];
    Object.keys(usersData).map((id) => {
      if (usersData[id].position === "Manager") {
        tempdropDownManager.push({
          key: usersData[id].uuid,
          managerName: usersData[id].name,
        });
      }
    });

    setDropDownManager(tempdropDownManager);
  }, [usersData]);

  const projectDetailChange = (e) => {
    setProjectDetail({ ...projectDetail, [e.target.name]: e.target.value });
  };

  const projectDetailClick = (e) => {
    appRef.child("Projects").push(projectDetail, () => {
      alert("Your Data Inserted Successfully");
    });
  };

  return (
    <>
      <div className={addpropop.mainpropopup}>
        <div className={addpropop.closebtn}>
          <button onClick={props.handleclose}>X</button>
        </div>
        <div className={addpropop.proadd}>
          <div className={addpropop.formhead}>
            <h1>ADD PROJECT</h1>
          </div>
          <div className={addpropop.fields}>
            <div>
              <div>
                <h3> Project Title : </h3>
                <input
                  type="text"
                  name="projectTitle"
                  onChange={projectDetailChange}
                  value={projectDetail.projectTitle}
                  className={addpropop.fieldsinput}
                ></input>
              </div>
              <div>
                <h3> Client Name : </h3>
                <input
                  type="text"
                  name="clientName"
                  onChange={projectDetailChange}
                  value={projectDetail.clientName}
                  className={addpropop.fieldsinput}
                ></input>
              </div>
              <div>
                <h3>Time Line : </h3>
                <input
                  type="date"
                  name="timeLine"
                  onChange={projectDetailChange}
                  value={projectDetail.timeLine}
                  className={addpropop.fieldsinput}
                ></input>
              </div>
              <div>
                <h3>Manager Name : </h3>
                <select name="managerid" onChange={projectDetailChange}>
                  <option value="Select Manager">---Select Manager---</option>
                  {Object.keys(dropDownManager).map((id) => (
                    <option key={id} value={dropDownManager[id].key}>
                      {dropDownManager[id].managerName}
                    </option>
                  ))}
                </select>
              </div>
              <div className={addpropop.fieldsbtn}>
                <button
                  className={addpropop.fieldsbtn1}
                  onClick={projectDetailClick}
                >
                  Submit
                </button>{" "}
                <button className={addpropop.fieldsbtn2}>Reset</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addprojectpopup;
