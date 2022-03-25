import React, { useState, useEffect } from "react";
import adminapprov from "./adminapproval.module.scss";
import Addmanager from "./Addmanager";
import appRef from "../../firebase";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Adminapproval = () => {
  const [addmanagerpopup, setAddmanagerpopup] = useState(false);
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
      if (usersData[id].position === "Manager") {
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

  const handleclose = () => {
    setAddmanagerpopup(!addmanagerpopup);
  };

  const managerAllow = async (id) => {
    await appRef.child(`Users/${id}`).on("value", (snap) => {
      const tempmanagerdata = snap.val();
      if (tempmanagerdata) {
        tempmanagerdata.activate = true;
        setManagerdata(tempmanagerdata);
        allowman(tempmanagerdata, id);
      }
    });
  };
  const allowman = (data, id) => {
    appRef.child(`Users/${id}`).set(data, () => {
      console.log("DONE");
    });
  };

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
      <div className={adminapprov.mainbox}>
        <h1>Users Approvals</h1>
        <div className={adminapprov.innerbox}>
          {Object.keys(usersData).map((index) => {
            if (usersData[index].activate === false) {
              return (
                <div key={index} className={adminapprov.empdetail}>
                  <div className={adminapprov.manbtn}>
                    <img src={require("@photos/man.png")} />
                    <div className={adminapprov.aprobtn}>
                      {usersData[index].position === "Employee" ? (
                        <button onClick={() => handleopen(index)}>Allow</button>
                      ) : (
                        <button onClick={() => managerAllow(index)}>
                          Allow
                        </button>
                      )}
                    </div>
                  </div>

                  <div onClick={() => navigate(`/layout/user/info/${index}`)}>
                    <h2>{usersData[index].name}</h2>
                    <h5>{usersData[index].mono}</h5>
                    <p>{usersData[index].name}</p>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <h1>Manager Approval</h1>
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
                        <p>reason :{leaveApproval[uid][lid].reason}</p>
                        <button onClick={() => approveLeaveClick(lid, uid)}>
                          ✔ Approve
                        </button>
                        <button onClick={() => rejectedLeaveClick(lid, uid)}>
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
                        <p>
                          description :{expenceApproval[uid][eid].description}
                        </p>
                        <button onClick={() => approveExpenceClick(eid, uid)}>
                          ✔ Approve
                        </button>
                        <button onClick={() => rejectedExpenceClick(eid, uid)}>
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
    </>
  );
};

export default Adminapproval;
