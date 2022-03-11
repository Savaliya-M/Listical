import React, { useState, useEffect } from "react";
import Addmanager from "./Addmanager";
import appRef from "../../firebase";

const Adminapproval = () => {
  const [addmanagerpopup, setAddmanagerpopup] = useState(false);
  const [usersData, setUsersData] = useState({});
  const [requestedUser, setRequestedUser] = useState({});
  const [managerdata, setManagerdata] = useState();
  const [dropDownManager, setDropDownManager] = useState();

  useEffect(() => {
    appRef.child("Users").on("value", (snap) => {
      setUsersData(snap.val());
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

  useEffect(() => {
    console.log(dropDownManager);
  }, [dropDownManager]);

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

  useEffect(() => {
    console.log(managerdata);
  }, [managerdata]);

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
      <div>
        <h1>Users Approvals</h1>
        {Object.keys(usersData).map((index) => {
          if (usersData[index].activate === false) {
            return (
              <div key={index}>
                <div>
                  <h1>LOGO</h1>
                  {usersData[index].position === "Employee" ? (
                    <button onClick={() => handleopen(index)}>Allow</button>
                  ) : (
                    <button onClick={() => managerAllow(index)}>Allow</button>
                  )}
                </div>
                <div>
                  <h2>{usersData[index].name}</h2>
                  <h5>{usersData[index].mono}</h5>
                  <p>{usersData[index].name}</p>
                </div>
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default Adminapproval;
