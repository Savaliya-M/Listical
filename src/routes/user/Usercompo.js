import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import appRef from "../../firebase";
import "./usercompo.css";

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
      <div className="mainusercompo">
        {userskey ? (
          userskey.map((elem) => {
            return (
              <div className="person" key={elem}>
                <div className="left">
                  <h1>LOGO</h1>
                  <button>Del</button>
                  <button>Dis</button>
                </div>
                <div
                  className="right"
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
          })
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Usercompo;
