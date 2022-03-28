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
  });
  let uid = localStorage.getItem("uuid");
  const [temptrackRecord, setTemptrackRecord] = useState({});
  const [startEndBtn, setstartEndBtn] = useState(false);
  const [id, setid] = useState("");

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
        setTemptrackRecord(snap.val());
        // console.log(snap.val());
      });
    }
  }, [id]);

  useEffect(() => {
    if (temptrackRecord && Object.values(temptrackRecord).length) {
      if (temptrackRecord.flag === false) {
        // console.log(temptrackRecord);
        setstartEndBtn(!startEndBtn);
      } else {
        return "";
      }
    } else {
      return "";
    }
  }, [temptrackRecord]);

  // console.log(temptrackRecord);
  const recordChange = (e) => {
    setTrackRecord({ ...trackRecord, [e.target.name]: e.target.value });
  };

  const recordstartClick = () => {
    appRef.child(`TimeTracker/${uid}`).push(trackRecord);
    setstartEndBtn(!startEndBtn);
  };

  const recordendClick = () => {
    Object.values(temptrackRecord)[0].flag = true;
    Object.values(temptrackRecord)[0].endTime = Date();
    let id = Object.keys(temptrackRecord);
    appRef
      .child(`TimeTracker/${uid}/${id}`)
      .on(Object.values(temptrackRecord)[0]);
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
      </div>
    </>
  );
};

export default TimeTracker;
