import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appRef from "../../firebase";
import empadd from "./employeeaddpopup.module.scss";

const EmployeeaddPopup = () => {
  const [users, setUsers] = useState({});
  const [projects, setProjects] = useState({});
  const [emp, setEmp] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    appRef.child("Users").on("value", (snap) => {
      setUsers(snap.val());
    });
  }, []);

  useEffect(() => {
    if (id) {
      appRef.child(`Projects/${id}`).on("value", (snap) => {
        setProjects(snap.val());
      });
    }
  }, [users]);

  const addEmp = (id) => {
    setEmp([...emp, id.uuid]);
  };

  useEffect(() => {
    setProjects({ ...projects, empids: emp });
  }, [emp]);

  const storeData = () => {
    appRef.child(`Projects/${id}`).set(projects, () => {
      alert("Data Stored successfully");
      navigate(-1);
    });
  };
  return (
    <>
      <div className={empadd.mainbox}>
        <div>
          <div className={empadd.header}>
            <div className={empadd.backbtn}>
              <button className={empadd.backbtn} onClick={() => navigate(-1)}>
                Back
              </button>
            </div>
            <div className={empadd.headname}>
              <h1>Employee's Details</h1>
            </div>
            <div className={empadd.savebtn}>
              <button className={empadd.savebtn} onClick={storeData}>
                Save
              </button>
            </div>
          </div>
        </div>
        <div className={empadd.team}>
          {Object.keys(users).map((id) => {
            if (users[id].managerid === localStorage.getItem("uuid")) {
              return (
                <div key={id}>
                  <div className={empadd.hi}>
                    <div
                      className={empadd.teammember}
                      onClick={() => {
                        navigate(`/layout/user/info/${id}`);
                      }}
                    >
                      <div className={empadd.teams}>
                        <div className={empadd.names}>
                          <h4>Name</h4>
                          <h3>{users[id].name}</h3>
                        </div>
                        <div className={empadd.mono}>
                          <h4>Mobile No.</h4>
                          <h3>{users[id].mono}</h3>
                        </div>
                        <div className={empadd.post}>
                          <h4>Post</h4>
                          <h3>{users[id].post}</h3>
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            onChange={() => addEmp(users[id])}
                          />
                        </div>
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
        {/* <div></div> */}
      </div>
    </>
  );
};

export default EmployeeaddPopup;
