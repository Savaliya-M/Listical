import React, { useState, useEffect } from "react";
import appRef from "../../firebase";
import { v4 as uuidv4 } from "uuid";

const TimeTracker = () => {
  const [trackRecord, setTrackRecord] = useState({
    tag: "",
    startTime: Date(),
    endTime: "",
    uid: uuidv4(),
    flag: false,
    workingTime: "",
  });
  const [oldData, setOldData] = useState({});
  let uid = localStorage.getItem("uuid");
  const [temptrackRecord, setTemptrackRecord] = useState({});
  const [startEndBtn, setstartEndBtn] = useState(false);
  const [id, setid] = useState("");
  // const [timer, setTimer] = useState({
  //   ho: 0,
  //   mi: 0,
  //   se: 0,
  // });

  useEffect(() => {
    appRef
      .child(`TimeTracker/${uid}`)
      .orderByChild(`startTime`)
      .startAt(Date.now())
      .on("value", function (snap) {
        let data = snap.val();
        setid(Object.keys(data)[Object.keys(data).length - 1]);
      });
  }, []);

  useEffect(() => {
    let flag = true;
    if (flag) {
      appRef.child(`TimeTracker/${uid}`).on("value", (snap) => {
        setOldData(snap.val());
        flag = false;
      });
    }
  }, []);

  useEffect(() => {
    if (id && id.length) {
      appRef.child(`TimeTracker/${uid}/${id}`).on("value", (snap) => {
        if (snap.val() && Object.values(snap.val()).length) {
          if (snap.val().flag === false) {
            setstartEndBtn(!startEndBtn);
          } else {
            return "";
          }
        } else {
          return "";
        }
        setTemptrackRecord(snap.val());
      });
    }
  }, [id, uid]);

  let d = new Date(temptrackRecord.startTime).getTime();

  setInterval(() => {
    let n = new Date().getTime();
    let h = Math.floor((n - d) / 1000 / 60 / 60);
    let m = Math.floor(((n - d) / 1000 / 60 / 60 - h) * 60);
    let s = Math.floor((((n - d) / 1000 / 60 / 60 - h) * 60 - m) * 60);
    if (startEndBtn) {
      if (
        (Number(h) || Number(h) === 0) &&
        (Number(m) || Number(m) === 0) &&
        (Number(s) || Number(s) === 0)
      ) {
        let timeTag = document.getElementById("timer");
        timeTag.innerHTML = h + " : " + m + " : " + s;
      }
    }
  }, 1000);

  const recordChange = (e) => {
    setTrackRecord({ ...trackRecord, [e.target.name]: e.target.value });
  };

  const recordstartClick = () => {
    appRef.child(`TimeTracker/${uid}`).push(trackRecord);
    setTrackRecord({
      tag: "",
      startTime: Date(),
      endTime: "",
      uid: uuidv4(),
      flag: false,
      workingTime: "",
    });
  };
  const recordendClick = () => {
    let t = new Date() - new Date(temptrackRecord.startTime);
    temptrackRecord.flag = true;
    temptrackRecord.endTime = Date();
    temptrackRecord.workingTime = t;

    appRef.child(`TimeTracker/${uid}/${id}`).set(temptrackRecord);
    setstartEndBtn(!startEndBtn);
  };

  const getDateTime = (time) => {
    return new Date(time).toLocaleTimeString();
  };
  const gettime = (time) => {
    let hours = Math.floor(time / 1000 / 60 / 60);
    let minutes = Math.floor((time / 1000 / 60 / 60 - hours) * 60);
    let seconds = Math.floor(
      ((time / 1000 / 60 / 60 - hours) * 60 - minutes) * 60
    );

    return hours + " : " + minutes + " : " + seconds;
  };

  return (
    <>
      <div>
        <h1>Time Tracker</h1>
        <div>
          <input
            type="text"
            name="tag"
            placeholder="What are you working on?"
            value={trackRecord.tag}
            onChange={recordChange}
          />

          {startEndBtn === false ? (
            <button onClick={recordstartClick}>Start</button>
          ) : (
            <button onClick={recordendClick}>End</button>
          )}
        </div>
        {startEndBtn === true ? (
          <div>
            {/* {timerClock()} */}
            <p id="timer"></p>
            {/* Time : {timer.ho} : {timer.mi} : {timer.se} */}
          </div>
        ) : (
          <></>
        )}
        <div>
          {oldData && oldData.length !== 0
            ? // ? console.log(oldData)
              Object.keys(oldData).map((id) => {
                return (
                  <div key={id}>
                    <p>
                      ============================================================
                    </p>
                    <p>{oldData[id].tag}</p>
                    <p>{getDateTime(oldData[id].startTime)}</p>
                    <p>
                      {oldData[id].endTime && oldData[id].endTime.length !== 0
                        ? getDateTime(oldData[id].endTime)
                        : ""}
                    </p>
                    <p>
                      {oldData[id].workingTime &&
                      oldData[id].workingTime.length !== 0
                        ? gettime(oldData[id].workingTime)
                        : ""}
                    </p>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </>
  );
};

export default TimeTracker;
