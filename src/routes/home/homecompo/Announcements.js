import React, { useState, useEffect } from "react";
import annocuncements from "./homecompo.module.scss";
import appRef from "../../../firebase";

const Announcements = (props) => {
  const [announcement, setAnnouncement] = useState({});
  const [announcementkey, setAnnouncementkey] = useState([]);
  useEffect(() => {
    appRef.child("Announcement").on("value", (snapshot) => {
      const userData = snapshot.val();
      const announcementkey = Object.keys(userData);
      setAnnouncement(snapshot.val());
      setAnnouncementkey(announcementkey);
    });
  }, []);
  const removeItem = (id) => {
    appRef.child(`/Announcement/${id}`).remove(() => {
      alert("Record Deleted Successfully");
      setAnnouncement({ announcehead: "", announcedesc: "" });
    });
  };
  return (
    <>
      <div className={annocuncements.mainhomecompo} id={annocuncements.announcements} >
        <div className={annocuncements.head} id={annocuncements.announcements}>
          <h3>Announcements</h3>
          <button onClick={props.handleopen}>+</button>
        </div>
        {announcementkey.map((id) => {
          return (
            <div className={annocuncements.mainContent} key={id}>
              <div
                className={annocuncements.content}
                id={annocuncements.announcement}
              >
                <div className={annocuncements.cimg}>
                  <p>img</p>
                </div>
                <div className={annocuncements.text}>
                  <h3>{announcement[id].announcehead}</h3>
                  <p>{announcement[id].announcedesc}</p>
                </div>
                <div>
                  <button onClick={() => removeItem(id)}>X</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Announcements;
