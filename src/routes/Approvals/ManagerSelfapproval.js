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
    position: "Manager",
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
      position: "",
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

    // appRef.child(`leave/ManagerLeave/${uid}`).on("value", (snap) => {
    //   if (snap.val()) {
    //     Object.keys(snap.val()).map((id) => {
    //       const d = new Date();
    //       let tempExpiryDate = new Date(snap.val()[id].rejectedDate);
    //       let templeaveEndD = new Date(snap.val()[id].leaveEndD);
    //       tempExpiryDate.setDate(tempExpiryDate.getDate() + 7);
    //       // templeaveEndD.setDate(templeaveEndD.getDate());
    //       if (templeaveEndD < d || tempExpiryDate < d) {
    //         appRef.child(`leave/ManagerLeave/${uid}/${id}`).remove();
    //       }
    //     });
    //   }
    // });

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
            appRef.child(`Expence/ManagerExpence/${uid}/${id}`).remove();
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
                <div className={managerapprov.content}>
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
            </div>
          </>
        ) : (
          <></>
        )}
        {applyExpencePopUp ? (
          <>
            <div className={managerapprov.outerbox2}>
              <div className={managerapprov.box2}>
                <div className={managerapprov.content2}>
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
            </div>
          </>
        ) : (
          <></>
        )}
        <div className={managerapprov.managerbox}>
          <div className={managerapprov.leavesbox}>
            <div className={managerapprov.leavetitle}>
              <h2>Leave Approvals</h2>
              <button onClick={() => setApplyLeavePopUp(!applyLeavePopUp)}>
                Apply For Leave
              </button>
            </div>
            {approvedLeave
              ? Object.keys(approvedLeave).map((id) => (
                <div className={managerapprov.leaves}>
                  <div key={approvedLeave[id]}>
                    <h3>Leave Title</h3>{approvedLeave[id].leaveTitle}
                    <div className={managerapprov.date}>
                      <div id={managerapprov.datesp}>
                        <h3>From</h3>{approvedLeave[id].leaveStartD}
                      </div>
                      <div>
                        <h3>To</h3>{approvedLeave[id].leaveEndD}
                      </div>
                    </div>
                    <p>
                      <h3>Reason</h3>{approvedLeave[id].reason}
                    </p>
                    {approvedLeave[id].allow === true ? (
                      <div className={managerapprov.resulttrue}>
                        <h3>✔ Approved</h3>
                      </div>
                    ) : approvedLeave[id].rejectedDate ? (
                      <div className={managerapprov.resultfalse}>
                        <h3>Rejected</h3>
                      </div>
                    ) : (
                      <div className={managerapprov.resultpandig}>
                        <h3>◌ Pending</h3>
                      </div>
                    )}
                  </div>
                </div>
              ))
              : ""}
          </div>
          <div className={managerapprov.expencesbox}>
            <div className={managerapprov.expenceitle}>
              <h2>Expence Approvals</h2>
              <button onClick={() => setApplyExpencePopUp(!applyExpencePopUp)}>
                Apply For Expence
              </button>
            </div>
            {approvedExpence
              ? Object.keys(approvedExpence).map((id) => (
                <div className={managerapprov.expences}>
                  <div key={approvedExpence[id]}>
                    <h3>Expence Title</h3>{approvedExpence[id].expenceTitle}
                    <h3>Ammount</h3>{approvedExpence[id].ammount}
                    <div className={managerapprov.description}>
                      <h3>Description</h3>{" "}
                      {approvedExpence[id].description}
                    </div>
                    {approvedExpence[id].allowDate ? (
                      <div className={managerapprov.resulttrue}>
                        <h3>✔ Approved</h3>
                      </div>
                    ) : approvedExpence[id].rejectedDate ? (
                      <div className={managerapprov.resultfalse}>
                        <h3>&#x2718; Rejected </h3>
                      </div>
                    ) : (
                      <div className={managerapprov.resultpandig}>
                        <h3>◌ Pending</h3>
                      </div>
                    )}
                  </div>
                </div>
              ))
              : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagerSelfapproval;
