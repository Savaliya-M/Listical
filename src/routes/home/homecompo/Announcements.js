import React, { useState, useEffect } from "react";
import annocuncements from "./homecompo.module.scss";
import appRef from "../../../firebase";
import { confirm } from "react-confirm-box";

const Announcements = ({ handleopen }) => {
  const [announcement, setAnnouncement] = useState({});
  const [announcementkey, setAnnouncementkey] = useState([]);
  useEffect(() => {
    appRef.child("Announcement").on("value", (snapshot) => {
      const userData = snapshot.val();
      if (userData) {
        const announcementkey = Object.keys(userData);
        setAnnouncement(snapshot.val());
        setAnnouncementkey(announcementkey);
      }
    });
  }, []);

  const options = {
    labels: {
      confirmable: "Confirm",
      cancellable: "Cancel",
    },
  };

  const removeItem = async (id, index) => {
    // const result = await confirm("Are you sure?", options);
    // if (result) {
    //   appRef.child(`/Announcement/${id}`).remove(() => {
    //     let data = announcement;
    //     delete data[id];
    //     setAnnouncement(data);
    //     const announcementkey = Object.keys(data);
    //     setAnnouncementkey(announcementkey);
    //   });
    //   return;
    // } else {
    //   return "";
    // }
    appRef.child(`/Announcement/${id}`).remove(() => {
      alert("Your data was deleted successfully.");
    });
  };

  return (
    <>
      <div className={annocuncements.home}>
        <div
          className={annocuncements.mainhomecompo}
          id={annocuncements.announcements}
        >
          <div
            className={annocuncements.head}
            id={annocuncements.announcements}
          >
            <h3>Announcements</h3>
            {localStorage.getItem("Type") === "Admin" ? (
              <button onClick={handleopen}>+</button>
            ) : (
              ""
            )}
          </div>
          <div className={annocuncements.scroll}>
            {announcementkey ? (
              announcementkey.map((id, index) => {
                return (
                  <div className={annocuncements.mainContent} key={id}>
                    <div
                      className={annocuncements.content}
                      id={annocuncements.announcement}
                    >
                      <div className={annocuncements.tagtext}>
                        <div className={annocuncements.textbtn}>
                          <div className={annocuncements.cimg}>
                            <img
                              src={require("@photos/noise.png")}
                              alt="logo"
                            />
                          </div>

                          <div className={annocuncements.text}>
                            <h3>{announcement[id].announcehead}</h3>
                            <p>{announcement[id].announcedesc}</p>
                          </div>
                        </div>
                        <div className={annocuncements.removebtn}>
                          {localStorage.getItem("Type") === "Admin" ? (
                            <button onClick={() => removeItem(id, index)}>
                              X
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Announcements;
