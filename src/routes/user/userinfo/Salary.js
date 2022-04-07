import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import appRef from "../../../firebase";

const Salary = ({ closeSalary, id, usalary }) => {
  const [trackerInfo, setTrackerInfo] = useState({});
  const [user, setUser] = useState({});
  const [salary, setSalary] = useState(0);
  // const { id } = useParams();

  // ************************************************************************************************************************************
  useEffect(() => {
    appRef.child(`TimeTracker/${id}`).on("value", (snap) => {
      setTrackerInfo(snap.val());
    });
  }, [id]);

  useEffect(() => {
    if (trackerInfo) {
      let Total = 0;
      Object.values(trackerInfo).map((id) => {
        return (Total += parseInt(id.workingTime));
      });
      setSalary(Total);
    }
  }, [trackerInfo]);
  // ************************************************************************************************************************************
  const convertDate = (time) => {
    return new Date(time).toLocaleTimeString();
  };

  const getDate = (time) => {
    return new Date(time).toLocaleDateString();
  };

  const gettime = (time) => {
    let hours = Math.floor(time / 1000 / 60 / 60);
    let minutes = Math.floor((time / 1000 / 60 / 60 - hours) * 60);
    let seconds = Math.floor(
      ((time / 1000 / 60 / 60 - hours) * 60 - minutes) * 60
    );
    return hours + " : " + minutes + " : " + seconds;
  };

  const getSalary = (TotalTime) => {
    // return TotalTime * usalary;
    return Math.trunc((TotalTime * usalary) / 60 / 60 / 1000);
  };

  // ************************************************************************************************************************************

  return (
    <>
      <div>
        <button onClick={closeSalary}>Close</button>
        <h1>Salary Page</h1>
        <div>
          <p>Total Working Hours :{gettime(salary)}</p>
        </div>
        <div>
          <p>Total Salary :{getSalary(salary)}</p>
        </div>
        <div>
          <p>
            ************************************************************************************************
          </p>
          {Object.keys(trackerInfo).map((id) => {
            return (
              <div key={id}>
                <div>
                  <p>{trackerInfo[id].tag}</p>
                  <p>{getDate(trackerInfo[id].startTime)}</p>
                  <p>{convertDate(trackerInfo[id].startTime)}</p>
                  <p>{convertDate(trackerInfo[id].endTime)}</p>
                  <p>{gettime(trackerInfo[id].workingTime)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Salary;
