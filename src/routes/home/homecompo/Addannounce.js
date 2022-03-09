import React, { useState, useEffect } from "react";
import appRef from "../../../firebase";

const Addannounce = (props) => {
  const [announce, setAnnounce] = useState({
    announcehead: "",
    announcedesc: "",
  });

  const sendannounce = (e) => {
    setAnnounce({ ...announce, [e.target.name]: e.target.value });
  };

  const storeannouncement = (e) => {
    e.preventDefault();
    appRef.child("Announcement").push(announce, () => {
      alert("Announcement set Successfully");
      setAnnounce({
        announcehead: "",
        announcedesc: "",
      });
    });
  };

  useEffect(() => {
    console.log(announce);
  }, [announce]);

  return (
    <>
      <div>
        <div>
          <div>
            <h1>ADD Announcement</h1>
            <button onClick={props.handleclose}>X</button>
          </div>

          <div>
            <div>
              <div>
                <h3> Announcement Title : </h3>
                <input
                  type="text"
                  name="announcehead"
                  onChange={sendannounce}
                  value={announce.announcehead}
                ></input>
              </div>
              <div>
                <h3> Announcement: </h3>
                <input
                  type="text"
                  name="announcedesc"
                  onChange={sendannounce}
                  value={announce.announcedesc}
                ></input>
              </div>
              <div>
                <button onClick={storeannouncement}>Submit</button>{" "}
                <button>Reset</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addannounce;
