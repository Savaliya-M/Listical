import React, { useState, useEffect } from "react";
import holiday from "./homecompo.module.scss";
import appRef from "../../../firebase";

const Upcomingholidays = (props) => {
  const [upholiday, setUpholiday] = useState({});
  const [upholidaykey, setUpholidaykey] = useState([]);
  useEffect(() => {
    appRef.child("Holiday").on("value", (snapshot) => {
      const holidayData = snapshot.val();
      const holidaykey = Object.keys(holidayData);
      setUpholiday(snapshot.val());
      setUpholidaykey(holidaykey);
    });
  }, []);

  useEffect(() => {
    const curdate = new Date();
    if (upholiday) {
      Object.keys(upholiday).map((elem) => {
        if (curdate > new Date(upholiday[elem].holidaydate)) {
          appRef.child(`/Holiday/${elem}`).remove(() => { });
        }
      });
    }
  }, [upholiday]);

  return (
    <>
      <div className={holiday.mainhomecompo} id={holiday.Upcomingholidays}>
        <div className={holiday.head} id={holiday.Upcomingholidays}>
          <h3>Upcoming Holidays</h3>
          {localStorage.getItem("Type") === "Admin" ? (
            <button onClick={props.handleopen}>+</button>
          ) : (
            ""
          )}
        </div>
        <div className={holiday.scroll}>
          {upholidaykey.map((id) => {
            return (
              <div className={holiday.mainContent} key={id}>
                <div className={holiday.content} id={holiday.Upcomingholidays}>
                  <div className={holiday.cimg}>
                    <h2>{upholiday[id].holidaytitle[0]}</h2>
                  </div>
                  <div className={holiday.text}>
                    <h3>{upholiday[id].holidaytitle}</h3>
                    <p>{upholiday[id].holidaydate}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Upcomingholidays;
