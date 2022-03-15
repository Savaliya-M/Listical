import React, { useState, useEffect } from "react";
import appRef from "../../firebase";
import { v4 as uuidv4 } from "uuid";

const Employeeapproval = () => {
  const [applyLeavePopUp, setApplyLeavePopUp] = useState(false);
  const [applyExpencePopUp, setApplyExpencePopUp] = useState(false);
  const [applyLeave, setApplyLeave] = useState({
    allow: false,
    leaveTitle: "",
    dayType: "",
    leaveStartD: "",
    leaveEndD: "",
    reason: "",
    uuid: localStorage.getItem("uuid"),
  });
  const [applyExpence, setApplyExpence] = useState({
    allow: false,
    expenceTitle: "",
    ammount: "",
    description: "",
    uuid: localStorage.getItem("uuid"),
  });
  const [approvedLeave, setApprovedLeave] = useState({});
  const uid = localStorage.getItem("uuid");
  const leaveChange = (e) => {
    setApplyLeave({ ...applyLeave, [e.target.name]: e.target.value });
  };

  const expenceChange = (e) => {
    setApplyExpence({ ...applyExpence, [e.target.name]: e.target.value });
  };
  console.log(applyExpence);

  const leaveClick = () => {
    const lid = uuidv4();
    appRef.child(`leave/EmployeeLeave/${uid}/${lid}`).set(applyLeave);
    setApplyLeave({
      allow: false,
      dayType: "",
      leaveStartD: "",
      leaveEndD: "",
      reason: "",
      uuid: localStorage.getItem("uuid"),
    });
  };

  const expenceClick = () => {};

  useEffect(() => {
    appRef.child(`EmployeeLeave/${uid}`).on("value", (snap) => {
      let tempApprovedLeave = [];
      Object.values(snap.val()).map((id) => {
        if (id.allow === true) {
          tempApprovedLeave.push(id);
        }
      });
      setApprovedLeave(tempApprovedLeave);
    });
  }, []);
  return (
    <>
      <div>
        {applyLeavePopUp ? (
          <>
            <h1>Leave approvals</h1>
            <button onClick={() => setApplyLeavePopUp(!applyLeavePopUp)}>
              X
            </button>
            <div>
              <h3>Leave Title</h3>
              <input
                type="text"
                name="leaveTitle"
                value={applyLeave.leaveTitle}
                onChange={leaveChange}
              />
              <h3>Day Type</h3>
              <input
                type="radio"
                value="Full Day"
                onChange={leaveChange}
                name="dayType"
              />
              Full Day
              <input
                type="radio"
                value="First Half Day"
                onChange={leaveChange}
                name="dayType"
              />
              First Half Day
              <input
                type="radio"
                value="Second Half Day"
                onChange={leaveChange}
                name="dayType"
              />
              Second Half Day
              <h4>From</h4>
              <input
                type="date"
                value={applyLeave.leaveStartD}
                onChange={leaveChange}
                name="leaveStartD"
              />
              <h4>To</h4>
              <input
                type="date"
                value={applyLeave.leaveEndD}
                onChange={leaveChange}
                name="leaveEndD"
              />
              <h3>Reson</h3>
              <textarea
                value={applyLeave.reson}
                onChange={leaveChange}
                name="reason"
                cols="100"
                rows="5"
              />
              <hr />
              <button onClick={leaveClick}>Send</button>
            </div>
          </>
        ) : (
          <></>
        )}
        {applyExpencePopUp ? (
          <>
            <h1>Expence approvals</h1>
            <button onClick={() => setApplyLeavePopUp(!applyLeavePopUp)}>
              X
            </button>
            <div>
              <h3>Expence Title</h3>
              <input
                type="text"
                name="expenceTitle"
                value={applyExpence.expenceTitle}
                onChange={expenceChange}
              />
              <h3>Ammount</h3>
              <input
                type="text"
                name="ammount"
                value={applyExpence.Ammount}
                onChange={expenceChange}
              />

              <h3>Description</h3>
              <textarea
                value={applyExpence.reson}
                onChange={expenceChange}
                name="description"
                cols="100"
                rows="5"
              />
              <hr />
              <button onClick={expenceClick}>Send</button>
            </div>
          </>
        ) : (
          <></>
        )}
        <button onClick={() => setApplyLeavePopUp(!applyLeavePopUp)}>
          Apply For Leave
        </button>
        <button onClick={() => setApplyExpencePopUp(!applyLeavePopUp)}>
          Apply For Expence
        </button>

        <h1> Approved Leave</h1>
        {Object.keys(approvedLeave).map((id) => (
          <div key={id}>
            <h1>Leave Title : {approvedLeave[id].leaveTitle}</h1>
            <p>
              From : {approvedLeave[id].leaveStartD} To :{" "}
              {approvedLeave[id].leaveEndD}
            </p>
            <h3>Approved</h3>
          </div>
        ))}

        <h1> Approved Expence</h1>
      </div>
    </>
  );
};

export default Employeeapproval;
