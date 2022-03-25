import React, { useState, useEffect } from "react";
import appRef from "../../firebase";

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
    <div>
      <button onClick={handleclose}>X</button>
      Manager Name :
      {/* <input type="text" name="managername" onChange={managername} /> */}
      <select name="managerid" onChange={managername}>
        <option value="Select Manager">---Select Manager---</option>
        {Object.keys(list).map((id) => (
          <option key={id} value={list[id].key}>
            {list[id].managerName}
          </option>
        ))}
      </select>
      <button onClick={addmanager}>Submit</button>
    </div>
  );
};

export default Addmanager;
