import React, { useState, useEffect } from "react";
import managerapr from "./managerapproval.module.scss";
import appRef from "../../firebase";
import ManagerSelfapproval from "./ManagerSelfapproval";
import { v4 as uuidv4 } from "uuid";

const Managerapproval = ({ name }) => {
  const [leaveApproval, setLeaveApproval] = useState([]);
  const [expenceApproval, setExpenceApproval] = useState({});
  const [managerLeave, setManagerLeave] = useState(false);
  const [users, setUsers] = useState([]);

  //************************************************************************************************************************/
  useEffect(() => {
    appRef.child("Users").on("value", (snap) => {
      let tempusers = [];
      let userData = snap.val();
      Object.keys(userData).map((data) => {
        if (userData[data].managerid === localStorage.getItem("uuid")) {
          tempusers.push(userData[data]);
        }
      });
      setUsers(tempusers);
    });
  }, []);

  useEffect(() => {
    if (users.length) {
      appRef.child(`leave/EmployeeLeave`).on("value", (snap) => {
        let leaveData = snap.val();
        let tempApprovalleave = [];
        Object.keys(leaveData).map((lid) => {
          Object.keys(users).map((uid) => {
            if (lid === users[uid].uuid) {
              tempApprovalleave.push(leaveData[lid]);
            }
          });
        });
        setLeaveApproval(tempApprovalleave);
      });

      appRef.child(`Expence/EmployeeExpence`).on("value", (snap) => {
        let expenceData = snap.val();
        let tempApprovalexpence = [];
        Object.keys(expenceData).map((eid) => {
          Object.keys(users).map((uid) => {
            if (eid === users[uid].uuid) {
              tempApprovalexpence.push(expenceData[eid]);
            }
          });
        });
        setExpenceApproval(tempApprovalexpence);
        // setExpenceApproval(snap.val());
      });
    }
  }, [users]);

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
      <div className={managerapr.toggalebtn}>
        {managerLeave ? (
          <button onClick={() => setManagerLeave(!managerLeave)}>Back</button>
        ) : (
          <button onClick={() => setManagerLeave(!managerLeave)}>
            For My Self
          </button>
        )}
      </div>
      <div className={managerapr.managerapproval}>
        {!managerLeave ? (
          <div>
            <div className={managerapr.headtitle}>
              <h1>Give Approvals To Employee</h1>
            </div>
            <div className={managerapr.empbox}>
              <div className={managerapr.leavesbox}>
                <div className={managerapr.leavetitle}>
                  <h2>Leave Approval</h2>
                </div>
                <div className={managerapr.leaves}>
                  {leaveApproval
                    ? Object.keys(leaveApproval).map((uid) => {
                      if (leaveApproval[uid]) {
                        return Object.keys(leaveApproval[uid]).map((lid) => {
                          if (leaveApproval[uid][lid].allow === false) {
                            return (
                              <div key={uuidv4()}>
                                <h3>{leaveApproval[uid][lid].uname}</h3>
                                <h4>{leaveApproval[uid][lid].leaveTitle}</h4>
                                <p>{leaveApproval[uid][lid].dayType}</p>
                                <p>
                                  <h4>From</h4>{leaveApproval[uid][lid].leaveStartD} To:{" "}
                                  {leaveApproval[uid][lid].leaveEndD}
                                </p>
                                <p><h4>Reason</h4>{leaveApproval[uid][lid].reason}</p>
                                <button id={managerapr.resulttrue}
                                  onClick={() =>
                                    approveLeaveClick(
                                      lid,
                                      leaveApproval[uid][lid].uuid
                                    )
                                  }
                                >
                                  ✔ Approve
                                </button>
                                <button id={managerapr.resultfalse}
                                  onClick={() =>
                                    rejectedLeaveClick(
                                      lid,
                                      leaveApproval[uid][lid].uuid
                                    )
                                  }
                                >
                                  &#x2718;  Reject
                                </button>
                              </div>
                            );
                          }
                        });
                      }
                    })
                    : ""}
                </div>
              </div>
              <div className={managerapr.expencesbox}>
                <div className={managerapr.expenceitle}>
                  <h2>Expence Approval</h2>
                </div>
                <div className={managerapr.expences}>
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
                                <p>
                                  Description:{" "}
                                  {expenceApproval[uid][eid].description}
                                </p>
                                <button
                                  onClick={() =>
                                    approveExpenceClick(
                                      eid,
                                      expenceApproval[uid][eid].uuid
                                    )
                                  }
                                >
                                  ✔ Approve
                                </button>
                                <button
                                  onClick={() =>
                                    rejectedExpenceClick(
                                      eid,
                                      expenceApproval[uid][eid].uuid
                                    )
                                  }
                                >
                                   &#x2718; Reject
                                </button>
                              </div>
                            );
                          }
                        });
                      }
                    })
                    : ""}
                </div>
              </div>
            </div>
          </div>

        ) : (
          <ManagerSelfapproval username={name} />
        )}
      </div>
    </>
  );
};

export default Managerapproval;
