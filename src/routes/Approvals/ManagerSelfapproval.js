import React, { useState, useEffect } from "react";
import managerapprov from "./employeeapproval.module.scss";
import appRef from "../../firebase";
import { v4 as uuidv4 } from "uuid";

const ManagerSelfapproval = ({ username }) => {
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
    uname: username,
  });
  const [applyExpence, setApplyExpence] = useState({
    allow: false,
    expenceTitle: "",
    ammount: "",
    description: "",
    uname: username,
  });
  const [approvedLeave, setApprovedLeave] = useState({});
  const [approvedExpence, setApprovedExpence] = useState({});
  const uid = localStorage.getItem("uuid");
  //**************************************************************************************** */

  const leaveChange = (e) => {
    setApplyLeave({ ...applyLeave, [e.target.name]: e.target.value });
  };

  const expenceChange = (e) => {
    setApplyExpence({ ...applyExpence, [e.target.name]: e.target.value });
  };

  const leaveClick = () => {
    const lid = uuidv4();
    appRef.child(`leave/ManagerLeave/${uid}/${lid}`).set(applyLeave);
    setApplyLeave({
      allow: false,
      leaveTitle: "",
      dayType: "",
      leaveStartD: "",
      leaveEndD: "",
      reason: "",
      uuid: localStorage.getItem("uuid"),
      uname: "",
    });
    setApplyLeavePopUp(!applyLeavePopUp);
  };

  const expenceClick = () => {
    const Eid = uuidv4();
    appRef.child(`Expence/ManagerExpence/${uid}/${Eid}`).set(applyExpence);
    setApplyExpence({
      allow: false,
      allowDate: "",
      expenceTitle: "",
      ammount: "",
      description: "",
      uname: "",
    });
    setApplyExpencePopUp(!applyExpencePopUp);
  };

  //******************************************************************************************************* */

  useEffect(() => {
    appRef.child(`leave/ManagerLeave/${uid}`).on("value", (snap) => {
      setApprovedLeave(snap.val());
    });

    appRef.child(`leave/ManagerLeave/${uid}`).on("value", (snap) => {
      if (snap.val()) {
        Object.keys(snap.val()).map((id) => {
          const d = new Date();
          let tempExpiryDate = new Date(snap.val()[id].rejectedDate);
          let templeaveEndD = new Date(snap.val()[id].leaveEndD);
          tempExpiryDate.setDate(tempExpiryDate.getDate() + 7);
          templeaveEndD.setDate(templeaveEndD.getDate() + 7);
          if (templeaveEndD < d || tempExpiryDate < d) {
            appRef.child(`leave/ManagerLeave/${uid}/${id}`).remove();
          }
        });
      }
    });

    appRef.child(`Expence/ManagerExpence/${uid}`).on("value", (snap) => {
      setApprovedExpence(snap.val());
    });

    appRef.child(`Expence/ManagerExpence/${uid}`).on("value", (snap) => {
      if (snap.val()) {
        Object.keys(snap.val()).map((id) => {
          const d = new Date();
          let tempExpiryDate = new Date(snap.val()[id].rejectedDate);
          tempExpiryDate.setDate(tempExpiryDate.getDate() + 7);
          if (d > tempExpiryDate) {
            appRef.child(`Expence/MAnagerExpence/${uid}/${id}`).remove();
          }
        });
      }
    });
  }, [uid]);

  //******************************************************************************************************** */
  return (
    <>
      <div className={managerapprov.approval}>
        {applyLeavePopUp ? (
          <>
            <div className={managerapprov.outerbox}>
              <div className={managerapprov.box}>
                <div className={managerapprov.head}>
                  <div className={managerapprov.title}>
                    <h1>Leave Approvals</h1>
                  </div>
                  <div className={managerapprov.btn}>
                    <button
                      onClick={() => setApplyLeavePopUp(!applyLeavePopUp)}
                    >
                      X
                    </button>
                  </div>
                </div>
                <div className={managerapprov.leave}>
                  <div className={managerapprov.leavedetails}>
                    <div className={managerapprov.leavetitle}>
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
                    <div className={managerapprov.leavedaytype}>
                      <h4>Day Type</h4>
                      <div className={managerapprov.leavetype}>
                        <div className={managerapprov.leavefull}>
                          <input
                            type="radio"
                            value="Full Day"
                            onChange={leaveChange}
                            name="dayType"
                          />{" "}
                          Full Day
                        </div>
                        <div className={managerapprov.leavefull}>
                          <input
                            type="radio"
                            value="First Half Day"
                            onChange={leaveChange}
                            name="dayType"
                          />{" "}
                          First Half Day
                        </div>
                        <div className={managerapprov.leavefull}>
                          <input
                            type="radio"
                            value="Second Half Day"
                            onChange={leaveChange}
                            name="dayType"
                          />{" "}
                          Second Half Day
                        </div>
                      </div>
                    </div>

                    <div className={managerapprov.leaveduration}>
                      <div className={managerapprov.leaveduration1}>
                        <h4>From</h4>
                        <div className={managerapprov.leavestart}>
                          <input
                            type="date"
                            value={applyLeave.leaveStartD}
                            onChange={leaveChange}
                            name="leaveStartD"
                          />
                        </div>
                      </div>

                      <div className={managerapprov.leaveduration1}>
                        <h4>To</h4>
                        <div className={managerapprov.leaveend}>
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
                  <div className={managerapprov.leavereson}>
                    <h4>Reson</h4>
                    <div className={managerapprov.leaveresonbox}>
                      <textarea
                        value={applyLeave.reson}
                        onChange={leaveChange}
                        name="reason"
                        placeholder="Why You Take Leaves?"
                      />
                    </div>
                  </div>
                </div>
                <div className={managerapprov.send}>
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
            <div className={managerapprov.outerbox2}>
              <div className={managerapprov.box2}>
                <div className={managerapprov.head2}>
                  <div className={managerapprov.title2}>
                    <h1>Expence approvals</h1>
                  </div>
                  <div className={managerapprov.btn2}>
                    <button
                      onClick={() => setApplyExpencePopUp(!applyExpencePopUp)}
                    >
                      X
                    </button>
                  </div>
                </div>
                <div className={managerapprov.expence}>
                  <div className={managerapprov.expencedetails}>
                    <div className={managerapprov.expencetitle}>
                      <h4>Expence Title</h4>
                      <div>
                        <input
                          type="text"
                          name="expenceTitle"
                          value={applyExpence.expenceTitle}
                          onChange={expenceChange}
                        />
                      </div>
                    </div>
                    <div className={managerapprov.expencetitle}>
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

                  <div className={managerapprov.description}>
                    <h4>Description</h4>
                    <div className={managerapprov.descriptionbox}>
                      <textarea
                        value={applyExpence.reson}
                        onChange={expenceChange}
                        name="description"
                      />
                    </div>
                  </div>
                </div>
                <div className={managerapprov.send2}>
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

        <h1>Leave Approvals</h1>
        {approvedLeave
          ? Object.keys(approvedLeave).map((id) => (
              <div key={approvedLeave[id]}>
                <h4>Leave Title : {approvedLeave[id].leaveTitle}</h4>
                <p>
                  From : {approvedLeave[id].leaveStartD}
                  To :{approvedLeave[id].leaveEndD}
                </p>
                {approvedLeave[id].allow === true ? (
                  <h4>✔ Approved</h4>
                ) : approvedLeave[id].rejectedDate ? (
                  <h4>Rejected</h4>
                ) : (
                  <h4>◌ Pending</h4>
                )}
              </div>
            ))
          : ""}

        <h1>Expence Approvals</h1>
        {approvedExpence
          ? Object.keys(approvedExpence).map((id) => (
              <div key={approvedExpence[id]}>
                <h4>Expence Title : {approvedExpence[id].expenceTitle}</h4>
                <p>Ammount : {approvedExpence[id].ammount}</p>

                {approvedExpence[id].allowDate ? (
                  <h4>✔ Approved</h4>
                ) : approvedExpence[id].rejectedDate ? (
                  <h4> Rejected </h4>
                ) : (
                  <h4>◌ Pending</h4>
                )}
              </div>
            ))
          : ""}
      </div>
    </>
  );
};

export default ManagerSelfapproval;
