import React, { useState, useEffect } from "react";
import holiday from "./homecompo.module.scss";
import appRef from "../../../firebase";

const Upcomingholidays = ({ handleopen }) => {
  const [upholiday, setUpholiday] = useState({});
  useEffect(() => {
    appRef.child("Holiday").on("value", (snapshot) => {
      setUpholiday(snapshot.val());
    });
  }, []);

  useEffect(() => {
    const curdate = new Date();
    if (upholiday) {
      Object.keys(upholiday).map((elem) => {
        if (curdate > new Date(upholiday[elem].holidaydate)) {
          appRef.child(`/Holiday/${elem}`).remove(() => {});
        }
        return elem;
      });
    }
  }, [upholiday]);

  return (
    <>
      <div className={holiday.mainhomecompo} id={holiday.Upcomingholidays}>
        <div className={holiday.head} id={holiday.Upcomingholidays}>
          <h3>Upcoming Holidays</h3>
          {localStorage.getItem("Type") === "Admin" ? (
            <button onClick={handleopen}>+</button>
          ) : (
            ""
          )}
        </div>
        <div className={holiday.scroll}>
          {upholiday
            ? Object.keys(upholiday).map((id) => {
                return (
                  <div className={holiday.mainContent} key={id}>
                    <div
                      className={holiday.content}
                      id={holiday.Upcomingholidays}
                    >
                      <div className={holiday.cimg}>
                      <img src={require("@photos/party.png")} alt="logo" />
                        {/* <h2>{upholiday[id].holidaytitle[0]}</h2> */}
                      </div>
                      <div className={holiday.text}>
                        <h3>{upholiday[id].holidaytitle}</h3>
                        <p>{upholiday[id].holidaydate}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </>
  );
};

export default Upcomingholidays;
