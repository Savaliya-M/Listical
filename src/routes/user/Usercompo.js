import React, { useState, useEffect } from "react";
import userscomp from "./usercompo.module.scss";
import { useNavigate } from "react-router-dom";
import appRef from "../../firebase";

const Usercompo = () => {
  let navigate = useNavigate();
  const [users, setUsers] = useState({});
  const [userskey, setUserskey] = useState([]);
  // const [btnDis, setBtnDis] = useState(false);

  useEffect(() => {
    appRef.child("Users").on("value", (snapshot) => {
      const userData = snapshot.val();
      const userskey = Object.keys(userData);
      setUsers(snapshot.val());
      setUserskey(userskey);
    });
  }, []);

  const disableUser = (uid) => {
    // setBtnDis(!btnDis);
    appRef.child(`Users/${uid}`).on("value", (snap) => {
      const user = snap.val();
      user.activate = false;
      appRef.child(`Users/${uid}`).set(user);
    });
  };

  const enableUser = (uid) => {
    appRef.child(`Users/${uid}`).on("value", (snap) => {
      const user = snap.val();
      user.activate = true;
      appRef.child(`Users/${uid}`).set(user);
    });
  };

  const delUser = (uid) => {
    appRef.child(`Users/${uid}`).remove();
  };

  return (
    <>
      <div className={userscomp.togglebtn}>
        <button>List</button>
      </div>

      <div className={userscomp.mainusercompo}>
        {localStorage.getItem("Type") === "Manager"
          ? Object.keys(users).map((id) => {
              if (users[id].managerid === localStorage.getItem("uuid")) {
                return (
                  <div className={userscomp.person} key={id}>
                    <div className={userscomp.left}>
                      <img src={require("@photos/man.png")} alt="person" />
                      <div className={userscomp.userbtn}>
                        <button
                          className={userscomp.btn1}
                          onClick={() => delUser(id)}
                        >
                          Del
                        </button>
                        {users[id].activate ? (
                          <button
                            className={userscomp.btn2}
                            onClick={() => disableUser(id)}
                          >
                            Dis
                          </button>
                        ) : (
                          <button
                            className={userscomp.btn2}
                            onClick={() => enableUser(id)}
                          >
                            Ena
                          </button>
                        )}
                      </div>
                    </div>
                    <div
                      className={userscomp.right}
                      onClick={() => {
                        navigate(`info/${id}`);
                      }}
                    >
                      <h2>{users[id].name}</h2>
                      <h5>{users[id].mono}</h5>
                      <p>{users[id].post}</p>
                    </div>
                  </div>
                );
              } else {
                return <></>;
              }
            })
          : userskey.map((elem) => {
              return (
                <div className={userscomp.person} key={elem}>
                  <div className={userscomp.left}>
                    <img src={require("@photos/man.png")} alt="person" />
                    <div className={userscomp.userbtn}>
                      <button
                        className={userscomp.btn1}
                        onClick={() => delUser(elem)}
                      >
                        Del
                      </button>

                      {users[elem].activate ? (
                        <button
                          className={userscomp.btn2}
                          onClick={() => disableUser(elem)}
                        >
                          Dis
                        </button>
                      ) : (
                        <button
                          className={userscomp.btn2}
                          onClick={() => enableUser(elem)}
                        >
                          Ena
                        </button>
                      )}
                    </div>
                  </div>
                  <div
                    className={userscomp.right}
                    onClick={() => {
                      navigate(`info/${elem}`);
                    }}
                  >
                    <h2>{users[elem].name}</h2>
                    <h5>{users[elem].mono}</h5>
                    <p>{users[elem].post}</p>
                  </div>
                </div>
              );
            })}
      </div>
    </>
  );
};

export default Usercompo;
