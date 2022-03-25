import React, { useState, useEffect } from "react";
import userscomp from "./usercompo.module.scss";
import { useNavigate } from "react-router-dom";
import appRef from "../../firebase";

const Usercompo = () => {
  let navigate = useNavigate();
  const [users, setUsers] = useState({});
  const [userskey, setUserskey] = useState([]);
  let sid;
  const userm = localStorage.getItem("uuid");
  useEffect(() => {
    appRef.child("Users").on("value", (snapshot) => {
      const userData = snapshot.val();
      const userskey = [];
      Object.keys(userData).map((id) => {
        if (userData[id].managerid || userData[id].position === "Manager") {
          userskey.push(id);
        }
        return id;
      });
      setUsers(userData);
      setUserskey(userskey);
    });
  }, []);

  Object.keys(users).map((id) => {
    if (users[id].uuid === userm) {
      return (sid = id);
    } else {
      return "";
    }
  });

  const disableUser = (uid) => {
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
          ? userskey.map((id) => {
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
                            key={id}
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
                      <p>{users[id].role}</p>
                    </div>
                    <div>
                      <button onClick={() => navigate(`chat/${id}/${sid}`)}>
                        Chat
                      </button>
                    </div>
                  </div>
                );
              } else {
                return <></>;
              }
            })
          : localStorage.getItem("Type") === "Admin"
          ? userskey.map((elem) => {
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
                          key={elem}
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
                    <h5>+91 {users[elem].mono}</h5>
                    <p>{users[elem].role}</p>
                  </div>
                  <div>
                    <button onClick={() => navigate(`chat/${elem}/${sid}`)}>
                      Chat
                    </button>
                  </div>
                </div>
              );
            })
          : localStorage.getItem("Type") === "Employee"
          ? userskey.map((id) => {
              const user = localStorage.getItem("uuid");
              if (user === users[id].uuid) {
                let sid = id;
                let manager = users[id].managerid;
                return Object.keys(users).map((uid) => {
                  if (users[uid].managerid && users[uid].uuid !== user) {
                    if (users[uid].managerid === manager) {
                      return (
                        <div className={userscomp.person} key={uid.uuid}>
                          <div className={userscomp.left}>
                            <img
                              src={require("@photos/man.png")}
                              alt="person"
                            />
                            <div className={userscomp.userbtn}>
                              <button
                                className={userscomp.btn1}
                                onClick={() => delUser(uid)}
                              >
                                Del
                              </button>
                              {users[uid].activate ? (
                                <button
                                  className={userscomp.btn2}
                                  onClick={() => disableUser(uid)}
                                >
                                  Dis
                                </button>
                              ) : (
                                <button
                                  className={userscomp.btn2}
                                  onClick={() => enableUser(uid)}
                                >
                                  Ena
                                </button>
                              )}
                            </div>
                          </div>
                          <div
                            className={userscomp.right}
                            onClick={() => {
                              navigate(`info/${uid}`);
                            }}
                          >
                            <h2>{users[uid].name}</h2>
                            <h5>{users[uid].mono}</h5>
                            <p>{users[uid].role}</p>
                          </div>
                          <div>
                            <button
                              onClick={() => navigate(`chat/${uid}/${sid}`)}
                            >
                              Chat
                            </button>
                          </div>
                        </div>
                      );
                    } else {
                      return <></>;
                    }
                  } else {
                    return <></>;
                  }
                });
              } else {
                return <></>;
              }
            })
          : ""}
      </div>
    </>
  );
};

export default Usercompo;
