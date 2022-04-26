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
    appRef.child(`Users/${user}`).on("value", (snap) => {
      setUseralldata(snap.val());
    });
  }, [user]);

  const addmanager = (e) => {
    appRef.child(`Users/${user}`).set(useralldata, () => {});
  };
  return (
    <div className={add.mainbox}>
      <div className={add.innerbox}>
        <button id={add.close} onClick={handleclose}>
          X
        </button>
        <div className={add.info}>
          <h1>Salary (Hours)</h1>
        </div>

        <div className={add.info}>
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
