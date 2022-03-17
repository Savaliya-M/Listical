import React, { useState, useEffect } from "react";
import appRef from "../../firebase";
import ManagerSelfapproval from "./ManagerSelfapproval";
import { v4 as uuidv4 } from "uuid";

const Managerapproval = ({ name }) => {
  const [leaveApproval, setLeaveApproval] = useState({});
  const [expenceApproval, setExpenceApproval] = useState({});
  const [managerLeave, setManagerLeave] = useState(false);

  //*********************************************************************************************************************** */
  useEffect(() => {
    appRef.child(`leave/EmployeeLeave`).on("value", (snap) => {
      setLeaveApproval(snap.val());
    });

    appRef.child(`Expence/EmployeeExpence`).on("value", (snap) => {
      setExpenceApproval(snap.val());
    });
  }, []);
  //*********************************************************************************************************************** */
  const approveLeaveClick = (lid, uid) => {
    let tempApproveLeave = {};
    appRef.child(`leave/EmployeeLeave/${uid}/${lid}`).on("value", (snap) => {
      tempApproveLeave = snap.val();
      tempApproveLeave.allow = true;
    });
    appRef.child(`leave/EmployeeLeave/${uid}/${lid}`).set(tempApproveLeave);
  };

  const rejectedLeaveClick = (lid, uid) => {
    let tempRejectedleave = {};
    const d = new Date();
    appRef.child(`leave/EmployeeLeave/${uid}/${lid}`).on("value", (snap) => {
      tempRejectedleave = snap.val();
      tempRejectedleave.allow = "Rejected";
      tempRejectedleave.rejectedDate = `${d}`;
    });
    appRef.child(`leave/EmployeeLeave/${uid}/${lid}`).set(tempRejectedleave);
  };

  const approveExpenceClick = (eid, uid) => {
    let tempApproveExpence = {};
    const d = new Date();
    appRef
      .child(`Expence/EmployeeExpence/${uid}/${eid}`)
      .on("value", (snap) => {
        tempApproveExpence = snap.val();
        tempApproveExpence.allow = true;
        tempApproveExpence.allowDate = `${d}`;
      });
    appRef
      .child(`Expence/EmployeeExpence/${uid}/${eid}`)
      .set(tempApproveExpence);
  };

  const rejectedExpenceClick = (eid, uid) => {
    let tempRejectedExpence = {};
    const d = new Date();
    appRef
      .child(`Expence/EmployeeExpence/${uid}/${eid}`)
      .on("value", (snap) => {
        tempRejectedExpence = snap.val();
        tempRejectedExpence.allow = true;
        tempRejectedExpence.rejectedDate = `${d}`;
      });
    appRef
      .child(`Expence/EmployeeExpence/${uid}/${eid}`)
      .set(tempRejectedExpence);
  };

  //*********************************************************************************************************************** */

  return (
    <>
      <div>
        {managerLeave ? (
          <button onClick={() => setManagerLeave(!managerLeave)}>Back</button>
        ) : (
          <button onClick={() => setManagerLeave(!managerLeave)}>
            For My Self
          </button>
        )}

        {!managerLeave ? (
          <div>
            <h1>Employee Approvals</h1>
            <h3>Leave Approval</h3>
            {leaveApproval
              ? Object.keys(leaveApproval).map((uid) => {
                  if (leaveApproval[uid]) {
                    return Object.keys(leaveApproval[uid]).map((lid) => {
                      if (
                        leaveApproval[uid][lid].allow === false &&
                        new Date(leaveApproval[uid][lid].leaveEndD) > new Date()
                      ) {
                        return (
                          <div key={uuidv4()}>
                            <h3>{leaveApproval[uid][lid].uname}</h3>
                            <h4>{leaveApproval[uid][lid].leaveTitle}</h4>
                            <p>{leaveApproval[uid][lid].dayType}</p>
                            <p>
                              From :{leaveApproval[uid][lid].leaveStartD} To:{" "}
                              {leaveApproval[uid][lid].leaveEndD}
                            </p>
                            <button onClick={() => approveLeaveClick(lid, uid)}>
                              ✔ Approve
                            </button>
                            <button
                              onClick={() => rejectedLeaveClick(lid, uid)}
                            >
                              ❌ Reject
                            </button>
                          </div>
                        );
                      }
                    });
                  }
                })
              : ""}

            <h3>Expence Approval</h3>
            {expenceApproval
              ? Object.keys(expenceApproval).map((uid) => {
                  if (expenceApproval[uid]) {
                    return Object.keys(expenceApproval[uid]).map((eid) => {
                      if (expenceApproval[uid][eid].allow === false) {
                        return (
                          <div key={uuidv4()}>
                            <h3>{expenceApproval[uid][eid].uname}</h3>
                            <h4>{expenceApproval[uid][eid].expenceTitle}</h4>
                            <p>Ammount : {expenceApproval[uid][eid].ammount}</p>
                            <button
                              onClick={() => approveExpenceClick(eid, uid)}
                            >
                              ✔ Approve
                            </button>
                            <button
                              onClick={() => rejectedExpenceClick(eid, uid)}
                            >
                              ❌ Reject
                            </button>
                          </div>
                        );
                      }
                    });
                  }
                })
              : ""}
          </div>
        ) : (
          <ManagerSelfapproval username={name} />
        )}
      </div>
    </>
  );
};

export default Managerapproval;
