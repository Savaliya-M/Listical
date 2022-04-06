import React, { useState, useEffect } from "react";
import appRef from "../../firebase";
import add from "./addmanager.module.scss";

const Addmanager = ({ handleclose, user, list }) => {
  const [useralldata, setUseralldata] = useState({});
  const managername = (e) => {
    setUseralldata({
      ...useralldata,
      [e.target.name]: e.target.value,
      activate: true,
    });
  };

  useEffect(() => {
    console.log(useralldata);
  }, [useralldata]);

  useEffect(() => {
    appRef.child(`Users/${user}`).on("value", (snap) => {
      setUseralldata(snap.val());
    });
  }, []);

  const addmanager = (e) => {
    appRef.child(`Users/${user}`).set(useralldata, () => {
      console.log("DONE");
    });
  };
  return (
    <div className={add.mainbox}>
      <div className={add.innerbox}>
        <button id={add.close} onClick={handleclose}>
          X
        </button>
        <div className={add.info}>
          <h1>Manager Name :</h1>
        </div>
        {/* <input type="text" name="managername" onChange={managername} /> */}
        <div className={add.info}>
          <select name="managerid" onChange={managername}>
            <option value="Select Manager">---Select Manager---</option>
            {Object.keys(list).map((id) => (
              <option key={id} value={list[id].key}>
                {list[id].managerName}
              </option>
            ))}
          </select>
        </div>
        <div className={add.info}>
          <h3>Salary</h3>
          <input
            type="text"
            onChange={managername}
            name="salary"
            value={useralldata.salary}
          />
        </div>
        <div className={add.info}>
          <button id={add.submit} onClick={addmanager}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Addmanager;
