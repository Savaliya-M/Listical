  import React, { useState, useEffect } from "react";
import appRef from "../../../firebase";
import Addan from "./addannounce.module.scss";

const Addannounce = ({ handleclose }) => {
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
      <div className={Addan.popup}>
        <div className={Addan.outer}>
          <div className={Addan.close}>
            <button onClick={handleclose}>X</button>
          </div>
          <div className={Addan.mainpropopup}>
            <div className={Addan.mid}>
              <div className={Addan.center}>
                <div className={Addan.title}>
                  <h1>Add Announcement</h1>
                </div>

                <div>
                  <div>
                    <div>
                      <h3> Announcement Title</h3>
                      <input
                        type="text"
                        name="announcehead"
                        onChange={sendannounce}
                        value={announce.announcehead}
                      ></input>
                    </div>
                    <div>
                      <h3> Announcement</h3>
                      <input
                        type="text"
                        name="announcedesc"
                        onChange={sendannounce}
                        value={announce.announcedesc}
                      ></input>
                    </div>
                    <div className={Addan.fildsbtn}>
                      <button id={Addan.btn1} onClick={storeannouncement}>
                        Submit
                      </button>{" "}
                      <button id={Addan.btn2}>Reset</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addannounce;
