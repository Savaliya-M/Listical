import React, { useEffect, useState } from "react";
import appRef from "../../../firebase";
import leave from "./homecompo.module.scss";

const Todaysleave = () => {
  const [todaysleave, setTodaysLeave] = useState({});
  const [todayLeaveData, setTodayLeaveData] = useState([]);
  useEffect(() => {
    appRef.child("leave").on("value", (snap) => {
      const templeave = snap.val();
      let tempTodaysLeave = [];
      Object.keys(templeave).map((meid) => {
        Object.keys(templeave[meid]).map((uid) => {
          Object.keys(templeave[meid][uid]).map((lid) => {
            if (templeave[meid][uid][lid].allow === true) {
              tempTodaysLeave.push(templeave[meid][uid][lid]);
            }
          });
        });
      });
      setTodaysLeave(tempTodaysLeave);
    });
  }, []);

  useEffect(() => {
    let tempLeaveData = [];
    Object.values(todaysleave).map((id) => {
      const dateMonthObj = {
        startmonth: new Date(id.leaveStartD).getMonth() + 1,
        startday: new Date(id.leaveStartD).getDate(),
        endmonth: new Date(id.leaveEndD).getMonth() + 1,
        endday: new Date(id.leaveEndD).getDate(),
      };
      const newDate = {
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
      };
      if (
        dateMonthObj.startmonth <= newDate.month &&
        dateMonthObj.startday <= newDate.day
      ) {
        tempLeaveData.push(id);
      }
      return id;
    });
    setTodayLeaveData(tempLeaveData);
  }, [todaysleave]);
  return (
    <>
    <div  className={leave.home}>
      <div className={leave.mainhomecompo} id={leave.Todaysleave}>
        <div className={leave.head} id={leave.Todaysleave}>
          <h3>Todays Leave</h3>
        </div>
        <div className={leave.scroll}>
          <div className={leave.mainContent}>
            {todayLeaveData
              ? Object.values(todayLeaveData).map((id) => (
                  <div
                    className={leave.content}
                    id={leave.Todaysleave}
                    key={id.uuid}
                  >
                    <div className={leave.cimg}>
                      {/* <h2>{id.uname[0]}</h2> */}
                      <img src={require("@photos/exit.png")} alt="logo" />
                    </div>
                    <div className={leave.text}>
                      <h3>{id.uname}</h3>
                      <p>{id.position}</p>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Todaysleave;
