import React, { useState, useEffect } from "react";
import userscomp from "./usercompo.module.scss";
import { useNavigate } from "react-router-dom";
import appRef from "../../firebase";

const Usercompo = () => {
  let navigate = useNavigate();
  const [users, setUsers] = useState({});
  const [userskey, setUserskey] = useState([]);

  useEffect(() => {
    appRef.child("Users").on("value", (snapshot) => {
      const userData = snapshot.val();
      const userskey = Object.keys(userData);
      setUsers(snapshot.val());
      setUserskey(userskey);
    });
  }, []);

  return (
    <>
      <div className={userscomp.mainusercompo}>
        {localStorage.getItem("Type") === "Manager"
          ? Object.keys(users).map((id) => {
              if (users[id].managerid === localStorage.getItem("uuid")) {
                return (
                  <div className={userscomp.person} key={id}>
                    <div className={userscomp.left}>
                      <button>Del</button>
                      <button>Dis</button>
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
                  <img src={require("@photos/man.png")} />
                    <div className={userscomp.userbtn}>
                  <button>Del</button>
                  <button>Dis</button>
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
        {/* {userskey.map((elem) => {
          return (
            <div className={userscomp.person}>
              <div className={userscomp.left}>
                <img src={require("@photos/man.png")} />
                <div className={userscomp.userbtn}>
                  <button>Del</button>
                  <button>Dis</button>
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
        })} */}
      </div>
    </>
  );
};

export default Usercompo;
