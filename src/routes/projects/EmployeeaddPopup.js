import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appRef from "../../firebase";

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
      <div>
        <button onClick={() => navigate(-1)}>Back</button>
        <button onClick={storeData}>Save</button>
        {Object.keys(users).map((id) => {
          if (users[id].managerid === localStorage.getItem("uuid")) {
            return (
              <div key={id}>
                <div>
                  <input type="checkbox" onChange={() => addEmp(users[id])} />
                </div>
                <div
                  onClick={() => {
                    navigate(`/layout/user/info/${id}`);
                  }}
                >
                  <h2>{users[id].name}</h2>
                  <h5>{users[id].mono}</h5>
                  <p>{users[id].post}</p>
                </div>
              </div>
            );
          } else {
            return <></>;
          }
        })}
      </div>
    </>
  );
};

export default EmployeeaddPopup;
