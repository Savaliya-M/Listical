import React, { useState, useEffect } from "react";
import empapprov from "./employeeapproval.module.scss";
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

  const expenceClick = () => { };

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
      <div className={empapprov.approval}>
        {applyLeavePopUp ? (
          <>
            <div className={empapprov.outerbox}>
              <div className={empapprov.box}>
                <div className={empapprov.head}>
                  <div className={empapprov.title}>
                    <h1>Leave Approvals</h1>
                  </div>
                  <div className={empapprov.btn}>
                    <button onClick={() => setApplyLeavePopUp(!applyLeavePopUp)}>
                      X
                    </button>
                  </div>
                </div>
                <div className={empapprov.leave}>
                  <div className={empapprov.leavedetails}>
                    <div className={empapprov.leavetitle}>
                      <h4>Leave Title</h4>
                      <div>
                        <input
                          type="text"
                          name="leaveTitle"
                          value={applyLeave.leaveTitle}
                          onChange={leaveChange}
                        />
                      </div>
                    </div>
                    <div className={empapprov.leavedaytype}>
                      <h4>Day Type</h4>
                      <div className={empapprov.leavetype}>
                        <div className={empapprov.leavefull}>
                          <input
                            type="radio"
                            value="Full Day"
                            onChange={leaveChange}
                            name="dayType"
                          /> Full Day
                        </div>
                        <div className={empapprov.leavefull}>
                          <input
                            type="radio"
                            value="First Half Day"
                            onChange={leaveChange}
                            name="dayType"
                          /> First Half Day
                        </div>
                        <div className={empapprov.leavefull}>
                          <input
                            type="radio"
                            value="Second Half Day"
                            onChange={leaveChange}
                            name="dayType"
                          /> Second Half Day
                        </div>
                      </div>
                    </div>

                    <div className={empapprov.leaveduration}>
                      <div className={empapprov.leaveduration1}>
                        <h4>From</h4>
                        <div className={empapprov.leavestart}>
                          <input
                            type="date"
                            value={applyLeave.leaveStartD}
                            onChange={leaveChange}
                            name="leaveStartD"
                          />
                        </div>
                      </div>

                      <div className={empapprov.leaveduration1}>
                        <h4>To</h4>
                        <div className={empapprov.leaveend}>
                          <input
                            type="date"
                            value={applyLeave.leaveEndD}
                            onChange={leaveChange}
                            name="leaveEndD"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={empapprov.leavereson}>
                    <h4>Reson</h4>
                    <div className={empapprov.leaveresonbox}>
                      <textarea
                        value={applyLeave.reson}
                        onChange={leaveChange}
                        name="reason"
                        placeholder="Why You Take Leaves?"
                      />
                    </div>
                  </div>
                </div>
                <div className={empapprov.send}>
                  <button onClick={leaveClick}>Send</button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
        {applyExpencePopUp ? (
          <>
            <div className={empapprov.outerbox2}>
              <div className={empapprov.box2}>
                <div className={empapprov.head2}>
                  <div className={empapprov.title2}>
                    <h1>Expence approvals</h1>
                  </div>
                  <div className={empapprov.btn2}>
                    <button onClick={() => setApplyExpencePopUp(!applyExpencePopUp)}>
                      X
                    </button>
                  </div>
                </div>
                  <div className={empapprov.expence}>
                    <div className={empapprov.expencedetails}>
                      <div className={empapprov.expencetitle}>
                        <h4>Expence Title</h4>
                        <div>
                          <input
                            type="text" n
                            name="expenceTitle"
                            value={applyExpence.expenceTitle}
                            onChange={expenceChange}
                          />
                        </div>
                      </div>
                      <div className={empapprov.expencetitle}>
                        <h4>Ammount</h4>
                        <div>
                          <input
                            type="text"
                            name="ammount"
                            value={applyExpence.Ammount}
                            onChange={expenceChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className={empapprov.description}>
                      <h4>Description</h4>
                      <div className={empapprov.descriptionbox}>
                        <textarea
                          value={applyExpence.reson}
                          onChange={expenceChange}
                          name="description"
                        />
                      </div>
                    </div>
                  </div>
                  <div className={empapprov.send2}>
                    <button onClick={expenceClick}>Send</button>
                  </div>
                </div>
              </div>
          </>
        ) : (
          <></>
        )}
        <button onClick={() => setApplyLeavePopUp(!applyLeavePopUp)}>
          Apply For Leave
        </button>
        <button onClick={() => setApplyExpencePopUp(!applyExpencePopUp)}>
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
            <h4>Approved</h4>
          </div>
        ))}

        <h1> Approved Expence</h1>
      </div>
    </>
  );
};

export default Employeeapproval;
