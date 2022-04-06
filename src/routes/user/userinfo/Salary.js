import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import appRef from "../../../firebase";

const Salary = () => {
  const [trackerInfo, setTrackerInfo] = useState({});
  const { id } = useParams();

  useEffect(() => {
    appRef.child(`TimeTracker/${id}`).on("value", (snap) => {
      setTrackerInfo(snap.val());
    });
  }, [id]);

  const convertDate = (time) => {
    return new Date(time).toLocaleTimeString();
  };
  useEffect(() => {
    if (trackerInfo) {
      let Total;
      Object.values(trackerInfo).map((id) => {
        Total += parseInt(id.workingTime);
      });
      console.log(Total);
    }
  }, [trackerInfo]);

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
        <h1>Salary Page</h1>
        <div>
          {Object.keys(trackerInfo).map((id) => {
            return (
              <div key={id}>
                <p>{trackerInfo[id].tag}</p>
                <p>{convertDate(trackerInfo[id].startTime)}</p>
                <p>{convertDate(trackerInfo[id].endTime)}</p>
                <p>{gettime(trackerInfo[id].workingTime)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Salary;
