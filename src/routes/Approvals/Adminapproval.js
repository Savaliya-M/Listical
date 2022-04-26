import React, { useState, useEffect } from "react";
import adminapprov from "./adminapproval.module.scss";
import Addmanager from "./Addmanager";
import AddmanagerSalary from "./AddmanagerSalary";
import appRef from "../../firebase";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Adminapproval = () => {
  const [addmanagerpopup, setAddmanagerpopup] = useState(false);
  const [addmanagersalarypopup, setAddmanagersalarypopup] = useState(false);
  const [usersData, setUsersData] = useState({});
  const [requestedUser, setRequestedUser] = useState({});
  const [managerdata, setManagerdata] = useState();
  const [dropDownManager, setDropDownManager] = useState();
  const [leaveApproval, setLeaveApproval] = useState({});
  const [expenceApproval, setExpenceApproval] = useState({});
  let navigate = useNavigate();

  //*********************************************************************************************************************** */

  useEffect(() => {
    appRef.child("Users").on("value", (snap) => {
      setUsersData(snap.val());
    });

    appRef.child(`leave/ManagerLeave`).on("value", (snap) => {
      setLeaveApproval(snap.val());
    });

    appRef.child(`Expence/ManagerExpence`).on("value", (snap) => {
      setExpenceApproval(snap.val());
    });
  }, []);

  useEffect(() => {
    let tempdropDownManager = [];
    Object.keys(usersData).map((id) => {
      if (usersData[id].position === "Manager" && usersData[id].activate) {
        tempdropDownManager.push({
          key: usersData[id].uuid,
          managerName: usersData[id].name,
        });
      }
    });

    setDropDownManager(tempdropDownManager);
  }, [usersData]);

  //*********************************************************************************************************************** */

  const handleopen = (id) => {
    setAddmanagerpopup(!addmanagerpopup);
    setRequestedUser(id);
  };

  const handleopenmanager = (id) => {
    setAddmanagersalarypopup(!addmanagersalarypopup);
    setRequestedUser(id);
  };

  const handleclose = () => {
    setAddmanagerpopup(!addmanagerpopup);
  };

  // const managerAllow = async (id) => {
  //   await appRef.child(`Users/${id}`).on("value", (snap) => {
  //     const tempmanagerdata = snap.val();
  //     if (tempmanagerdata) {
  //       tempmanagerdata.activate = true;
  //       setManagerdata(tempmanagerdata);
  //       allowman(tempmanagerdata, id);
  //     }
  //   });
  // };
  // const allowman = (data, id) => {
  //   appRef.child(`Users/${id}`).set(data, () => {
  //   });
  // };

  const approveLeaveClick = (lid, uid) => {
    let tempApproveLeave = {};
    appRef.child(`leave/ManagerLeave/${uid}/${lid}`).on("value", (snap) => {
      tempApproveLeave = snap.val();
      tempApproveLeave.allow = true;
    });
    appRef.child(`leave/ManagerLeave/${uid}/${lid}`).set(tempApproveLeave);
  };

  const rejectedLeaveClick = (lid, uid) => {
    let tempRejectedleave = {};
    const d = new Date();
    appRef.child(`leave/ManagerLeave/${uid}/${lid}`).on("value", (snap) => {
      tempRejectedleave = snap.val();
      tempRejectedleave.allow = "Rejected";
      tempRejectedleave.rejectedDate = `${d}`;
    });
    appRef.child(`leave/ManagerLeave/${uid}/${lid}`).set(tempRejectedleave);
  };

  const approveExpenceClick = (eid, uid) => {
    let tempApproveExpence = {};
    const d = new Date();
    appRef.child(`Expence/ManagerExpence/${uid}/${eid}`).on("value", (snap) => {
      tempApproveExpence = snap.val();
      tempApproveExpence.allow = true;
      tempApproveExpence.allowDate = `${d}`;
    });
    appRef
      .child(`Expence/ManagerExpence/${uid}/${eid}`)
      .set(tempApproveExpence);
  };

  const rejectedExpenceClick = (eid, uid) => {
    let tempRejectedExpence = {};
    const d = new Date();
    appRef.child(`Expence/ManagerExpence/${uid}/${eid}`).on("value", (snap) => {
      tempRejectedExpence = snap.val();
      tempRejectedExpence.allow = true;
      tempRejectedExpence.rejectedDate = `${d}`;
    });
    appRef
      .child(`Expence/ManagerExpence/${uid}/${eid}`)
      .set(tempRejectedExpence);
  };
  //*********************************************************************************************************************** */

  return (
    <>
      {addmanagerpopup ? (
        <Addmanager
          handleclose={handleclose}
          user={requestedUser}
          list={dropDownManager}
        />
      ) : (
        ""
      )}
      {addmanagersalarypopup ? (
        <AddmanagerSalary
          handleclose={() => setAddmanagersalarypopup(!addmanagersalarypopup)}
          user={requestedUser}
          list={dropDownManager}
        />
      ) : (
        ""
      )}
      <div className={adminapprov.mainbox}>
        {/* <h1>Users Approvals</h1> */}
        <div className={adminapprov.innerbox}>
          {Object.keys(usersData).map((index) => {
            if (
              (usersData[index].activate === false &&
                usersData[index].position === "Manager" &&
                usersData[index].salary === 0) ||
              (!usersData[index].managerid &&
                usersData[index].position === "Employee" &&
                usersData[index].activate === false)
            ) {
              return (
                <div key={index} className={adminapprov.empdetail}>
                  <h2>Users Approvals</h2>
                  <div className={adminapprov.manbtn}>
                    <img src={require("@photos/man.png")} alt="Man" />
                    <div className={adminapprov.aprobtn}>
                      {usersData[index].position === "Employee" ? (
                        <button onClick={() => handleopen(index)}>Allow</button>
                      ) : (
                        // <button onClick={() => managerAllow(index)}>
                        <button onClick={() => handleopenmanager(index)}>
                          Allow
                        </button>
                      )}
                    </div>
                  </div>

                  <div
                    className={adminapprov.details}
                    onClick={() => navigate(`/layout/user/info/${index}`)}
                  >
                    <h2>{usersData[index].name}</h2>
                    <h5>+91 {usersData[index].mono}</h5>
                    <p>{usersData[index].role}</p>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className={adminapprov.managerapproval}>
          <h1>Manager Approval</h1>
          <div className={adminapprov.empbox}>
            <div className={adminapprov.leavesbox}>
              <div className={adminapprov.leavetitle}>
                <h2>Leave Approval</h2>
              </div>

              {leaveApproval
                ? Object.keys(leaveApproval).map((uid) => {
                    if (leaveApproval[uid]) {
                      return Object.keys(leaveApproval[uid]).map((lid) => {
                        if (
                          leaveApproval[uid][lid].allow === false &&
                          new Date(leaveApproval[uid][lid].leaveEndD) >
                            new Date()
                        ) {
                          return (
                            <div className={adminapprov.leaves}>
                              <div key={uuidv4()}>
                                <h3>{leaveApproval[uid][lid].uname}</h3>
                                <div className={adminapprov.leaveinfo}>
                                  <div id={adminapprov.leavetitle}>
                                    <h4>
                                      {leaveApproval[uid][lid].leaveTitle}
                                    </h4>
                                  </div>
                                  <div id={adminapprov.leaveday}>
                                    {leaveApproval[uid][lid].dayType}
                                  </div>
                                </div>
                                <p>
                                  <div className={adminapprov.date}>
                                    <div className={adminapprov.date1}>
                                      <h4>From</h4>
                                      {leaveApproval[uid][lid].leaveStartD}
                                    </div>
                                    <div className={adminapprov.date2}>
                                      <h4>To</h4>{" "}
                                      {leaveApproval[uid][lid].leaveEndD}
                                    </div>
                                  </div>
                                </p>
                                <div>
                                  <h4>Reason</h4>{" "}
                                  {leaveApproval[uid][lid].reason}
                                </div>
                                <button
                                  id={adminapprov.resulttrue}
                                  onClick={() => approveLeaveClick(lid, uid)}
                                >
                                  ✔ Approve
                                </button>
                                <button
                                  id={adminapprov.resultfalse}
                                  onClick={() => rejectedLeaveClick(lid, uid)}
                                >
                                  &#x2718; Reject
                                </button>
                              </div>
                            </div>
                          );
                        }
                      });
                    }
                  })
                : ""}
            </div>

            <div className={adminapprov.expencesbox}>
              <div className={adminapprov.expenceitle}>
                <h2>Expence Approval</h2>
              </div>
              {expenceApproval ? (
                Object.keys(expenceApproval).map((uid) => {
                  if (expenceApproval[uid]) {
                    return Object.keys(expenceApproval[uid]).map((eid) => {
                      if (expenceApproval[uid][eid].allow === false) {
                        return (
                          <div className={adminapprov.expences} key={uuidv4()}>
                            <div>
                              <h3>{expenceApproval[uid][eid].uname}</h3>
                              <h4>{expenceApproval[uid][eid].expenceTitle}</h4>
                              <p>
                                <h4>Amount </h4>
                                <p>{expenceApproval[uid][eid].ammount}</p>
                              </p>
                              <div>
                                <h4>Description</h4>
                                {expenceApproval[uid][eid].description}
                              </div>
                              <button
                                id={adminapprov.resulttrue}
                                onClick={() => approveExpenceClick(eid, uid)}
                              >
                                ✔ Approve
                              </button>
                              <button
                                id={adminapprov.resultfalse}
                                onClick={() => rejectedExpenceClick(eid, uid)}
                              >
                                &#x2718; Reject
                              </button>
                            </div>
                          </div>
                        );
                      }
                    });
                  }
                })
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Adminapproval;
