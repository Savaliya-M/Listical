import React, { useState, useEffect } from "react";
import empapprov from "./employeeapproval.module.scss";
import appRef from "../../firebase";
import { v4 as uuidv4 } from "uuid";

const Employeeapproval = ({ name, role }) => {
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
    uname: name,
    position: role,
  });
  const [applyExpence, setApplyExpence] = useState({
    allow: false,
    expenceTitle: "",
    ammount: "",
    description: "",
    uname: name,
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
    appRef.child(`leave/EmployeeLeave/${uid}/${lid}`).set(applyLeave);
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
    appRef.child(`Expence/EmployeeExpence/${uid}/${Eid}`).set(applyExpence);
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
    appRef.child(`leave/EmployeeLeave/${uid}`).on("value", (snap) => {
      setApprovedLeave(snap.val());
    });

    appRef.child(`leave/EmployeeLeave/${uid}`).on("value", (snap) => {
      if (snap.val() && snap.val().length !== 0) {
        Object.keys(snap.val()).map((id) => {
          const d = new Date();
          let tempExpiryDate = new Date(snap.val()[id].rejectedDate);
          let templeaveEndD = new Date(snap.val()[id].leaveEndD);
          tempExpiryDate.setDate(tempExpiryDate.getDate() + 7);
          templeaveEndD.setDate(templeaveEndD.getDate() + 7);
          if (templeaveEndD < d || tempExpiryDate < d) {
            appRef.child(`leave/EmployeeLeave/${uid}/${id}`).remove();
          }
        });
      }
    });

    appRef.child(`Expence/EmployeeExpence/${uid}`).on("value", (snap) => {
      setApprovedExpence(snap.val());
    });

    appRef.child(`Expence/EmployeeExpence/${uid}`).on("value", (snap) => {
      if (snap.val() && snap.val().length !== 0) {
        Object.keys(snap.val()).map((id) => {
          const d = new Date();
          let tempExpiryDate = new Date(snap.val()[id].rejectedDate);
          tempExpiryDate.setDate(tempExpiryDate.getDate() + 7);
          if (d > tempExpiryDate) {
            appRef.child(`Expence/EmployeeExpence/${uid}/${id}`).remove();
          }
        });
      }
    });
  }, [uid]);

  //******************************************************************************************************** */
  return (
    <>
      <div className={empapprov.empapproval}>
        {applyLeavePopUp ? (
          <>
            <div className={empapprov.outerbox}>
              <div className={empapprov.box}>
                <div className={empapprov.content}>
                  <div className={empapprov.head}>
                    <div className={empapprov.title}>
                      <h1>Leave Approvals</h1>
                    </div>
                    <div className={empapprov.btn}>
                      <button
                        onClick={() => setApplyLeavePopUp(!applyLeavePopUp)}
                      >
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
                            />{" "}
                            Full Day
                          </div>
                          <div className={empapprov.leavefull}>
                            <input
                              type="radio"
                              value="First Half Day"
                              onChange={leaveChange}
                              name="dayType"
                            />{" "}
                            First Half Day
                          </div>
                          <div className={empapprov.leavefull}>
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
            </div>
          </>
        ) : (
          <></>
        )}
        {applyExpencePopUp ? (
          <>
            <div className={empapprov.outerbox2}>
              <div className={empapprov.box2}>
                <div className={empapprov.content2}>
                  <div className={empapprov.head2}>
                    <div className={empapprov.title2}>
                      <h1>Expence approvals</h1>
                    </div>
                    <div className={empapprov.btn2}>
                      <button
                        onClick={() => setApplyExpencePopUp(!applyExpencePopUp)}
                      >
                        X
                      </button>
                    </div>
                  </div>
                  {/* <div className={empapprov.expence}>
                  <div className={empapprov.expencedetails}>
                    <div className={empapprov.expencetitle}>
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
                    <div className={empapprov.btn2}>
                      <button
                        onClick={() => setApplyExpencePopUp(!applyExpencePopUp)}
                      >
                        X
                      </button>
                    </div>
                  </div> */}
                  <div className={empapprov.expence}>
                    <div className={empapprov.expencedetails}>
                      <div className={empapprov.expencetitle}>
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
            </div>
          </>
        ) : (
          <></>
        )}

        <div className={empapprov.managerbox}>
          <div className={empapprov.leavesbox}>
            <div className={empapprov.leavetitle}>
              <h2>Leave Approvals</h2>
              <button onClick={() => setApplyLeavePopUp(!applyLeavePopUp)}>
                Apply For Leave
              </button>
            </div>
            {approvedLeave ? (
              Object.keys(approvedLeave).map((id) => (
                <div className={empapprov.leaves}>
                  <div key={id}>
                    <h3>Leave Title</h3>
                    {approvedLeave[id].leaveTitle}
                    <div className={empapprov.date}>
                      <div id={empapprov.datesp}>
                        <h3>From</h3>
                        {approvedLeave[id].leaveStartD}
                      </div>
                      <div>
                        <h3>To</h3>
                        {approvedLeave[id].leaveEndD}
                      </div>
                    </div>
                    <div>
                      <h3>Reason</h3> {approvedLeave[id].reason}
                    </div>

                    {approvedLeave[id].allow === true ? (
                      <div className={empapprov.resulttrue}>
                        <h3>✔ Approved</h3>
                      </div>
                    ) : approvedLeave[id].rejectedDate ? (
                      <div className={empapprov.resultfalse}>
                        <h3> &#x2718; Rejected</h3>
                      </div>
                    ) : (
                      <div className={empapprov.resultpandig}>
                        <h3>◌ Pending</h3>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>

          <div className={empapprov.expencesbox}>
            <div className={empapprov.expenceitle}>
              <h2>Expence Approvals</h2>
              <button onClick={() => setApplyExpencePopUp(!applyExpencePopUp)}>
                Apply For Expence
              </button>
            </div>
            {approvedExpence ? (
              Object.keys(approvedExpence).map((id) => (
                <div className={empapprov.expences}>
                  <div key={id}>
                    <h3>Expence Title</h3>
                    {approvedExpence[id].expenceTitle}
                    <h3>Ammount</h3>
                    {approvedExpence[id].ammount}
                    <h3>Description</h3> {approvedExpence[id].description}
                    {approvedExpence[id].allowDate ? (
                      <div className={empapprov.resulttrue}>
                        <h3>✔ Approved</h3>
                      </div>
                    ) : approvedExpence[id].rejectedDate ? (
                      <div className={empapprov.resultfalse}>
                        <h3>&#x2718; Rejected </h3>
                      </div>
                    ) : (
                      <div className={empapprov.resultpandig}>
                        <h3>◌ Pending</h3>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Employeeapproval;
