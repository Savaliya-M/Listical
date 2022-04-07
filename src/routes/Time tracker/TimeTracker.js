import React, { useState, useEffect } from "react";
import appRef from "../../firebase";
import { v4 as uuidv4 } from "uuid";

const TimeTracker = () => {
  const [trackRecord, setTrackRecord] = useState({
    tag: "",
    startTime: "",
    endTime: "",
    uid: "",
    flag: false,
    workingTime: "",
  });
  const [oldData, setOldData] = useState({});
  let uid = localStorage.getItem("uuid");
  const [temptrackRecord, setTemptrackRecord] = useState({});
  const [startEndBtn, setstartEndBtn] = useState(false);
  const [id, setid] = useState("");
  const [myTimerIntervalID, setMyTimerIntervalID] = useState(null);

  // *********************************************************************************************************************************
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
    if (id && id.length) {
      appRef.child(`TimeTracker/${uid}/${id}`).on("value", (snap) => {
        if (snap.val() && Object.values(snap.val()).length) {
          if (snap.val().flag === false) {
            console.log("gfghfjfjh");
            if (snap.val().startTime) {
              setstartEndBtn(true);
            }
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

  useEffect(() => {
    console.log("IN state chnage", startEndBtn);
    if (startEndBtn) {
      startMyInterval();
    } else {
      console.log("myTimerIntervalID", myTimerIntervalID);
      if (myTimerIntervalID) {
        clearInterval(myTimerIntervalID);
        setMyTimerIntervalID(null);
      }
    }
  }, [startEndBtn]);

  useEffect(() => {
    let flag = true;
    if (flag) {
      appRef.child(`TimeTracker/${uid}`).on("value", (snap) => {
        setOldData(snap.val());
        flag = false;
      });
    }
  }, []);

  // *********************************************************************************************************************************

  const recordstartClick = () => {
    let sendData = {
      tag: trackRecord.tag,
      startTime: Date(),
      endTime: "",
      uid: uuidv4(),
      flag: false,
      workingTime: "",
    };
    appRef.child(`TimeTracker/${uid}`).push(sendData);
    console.log(sendData);
    setTrackRecord(sendData);
    setstartEndBtn(!startEndBtn);
  };

  const startMyInterval = () => {
    let d = new Date(trackRecord.startTime).getTime();
    let intervalID = setInterval(() => {
      console.log("IN interval");
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
    setMyTimerIntervalID(intervalID);
    console.log("myTimerIntervalIDdsfhjdksfkjs", myTimerIntervalID);
  };

  const recordendClick = () => {
    let t = new Date() - new Date(temptrackRecord.startTime);
    trackRecord.flag = true;
    trackRecord.endTime = Date();
    trackRecord.workingTime = t;
    appRef.child(`TimeTracker/${uid}/${id}`).set(trackRecord);
    console.log(trackRecord);
    const abc = !startEndBtn;
    console.log("end", abc);
    setstartEndBtn(abc);
  };

  const recordChange = (e) => {
    setTrackRecord({ ...trackRecord, [e.target.name]: e.target.value });
  };

  const getDateTime = (time) => {
    return new Date(time).toLocaleTimeString();
  };

  const getDate = (timeDate) => {
    return new Date(timeDate).toLocaleDateString();
  };

  const gettime = (time) => {
    let hours = Math.floor(time / 1000 / 60 / 60);
    let minutes = Math.floor((time / 1000 / 60 / 60 - hours) * 60);
    let seconds = Math.floor(
      ((time / 1000 / 60 / 60 - hours) * 60 - minutes) * 60
    );
    return hours + " : " + minutes + " : " + seconds;
  };
  // *********************************************************************************************************************************

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

          {!startEndBtn ? (
            <button onClick={recordstartClick}>Start</button>
          ) : (
            <button onClick={recordendClick}>End</button>
          )}
        </div>
        {startEndBtn ? (
          <div>
            <p id="timer"></p>
          </div>
        ) : (
          <></>
        )}
        <div>
          {oldData && oldData.length !== 0
            ? Object.keys(oldData).map((id) => {
                return (
                  <div key={id}>
                    <p>
                      ============================================================
                    </p>
                    <p>{oldData[id].tag}</p>
                    <p>{getDate(oldData[id].startTime)}</p>
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
