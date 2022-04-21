import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import appRef from "../../../firebase";
import empsalary from "./salary.module.scss";

const Salary = ({ closeSalary, id, usalary }) => {
  const [trackerInfo, setTrackerInfo] = useState([]);
  // const [user, setUser] = useState({});
  const [salary, setSalary] = useState(0);
  // const { id } = useParams();

  // ************************************************************************************************************************************
  useEffect(() => {
    appRef.child(`TimeTracker/${id}`).on("value", (snap) => {
      let temptrackinfo = [];
      // let tempmonthtrackinfo = [];
      let data = snap.val();
      if (data && data.length !== 0) {
        Object.keys(data).map((id) => {
          if (
            new Date(data[id].startTime).getMonth() === new Date().getMonth()
          ) {
            temptrackinfo.push(data[id]);
          }
        });
      }

      // Object.keys(data).map((id) => {
      //   if (new Date(data[id].startTime).getMonth() === new Date().getMonth()) {
      //     temptrackinfo.push(data[id]);
      //   }
      // });

      setTrackerInfo(temptrackinfo);
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
    return Math.trunc((TotalTime * usalary) / 60 / 60 / 1000);
  };

  // ************************************************************************************************************************************

  return (
    <>
      <div className={empsalary.main}>
        <div className={empsalary.heading}>
          <button id={empsalary.close} onClick={closeSalary}>
            Close
          </button>
          <h1 id={empsalary.h1}>Salary Page</h1>
        </div>
        <div className={empsalary.info}>
          <div className={empsalary.infotacker}>
            <div>
              <p>Total Working Hours :{gettime(salary)}</p>
            </div>
            <div>
              <p>Total Salary :{getSalary(salary)}</p>
            </div>
          </div>
        </div>

        <table id={empsalary.tablehead}>
          <thead id={empsalary.tablehead}>
            <tr>
              <th id={empsalary.ttitle}>Title</th>
              <th id={empsalary.tdate}>Date</th>
              <th id={empsalary.tstime}>Start Time</th>
              <th id={empsalary.tetime}>End Time</th>
              <th id={empsalary.twtime}>Title</th>
            </tr>
          </thead>
        </table>

        {Object.keys(trackerInfo).map((id) => {
          return (
            <div key={id}>
              <div className={empsalary.timedetails}>
                <table>
                  <tbody>
                    <tr>
                      <td id={empsalary.title}>
                        <div>{trackerInfo[id].tag}</div>
                      </td>
                      <td id={empsalary.date}>
                        <div>{getDate(trackerInfo[id].startTime)}</div>
                      </td>
                      <td id={empsalary.stime}>
                        <div>{convertDate(trackerInfo[id].startTime)}</div>
                      </td>
                      <td id={empsalary.etime}>
                        <div>{convertDate(trackerInfo[id].endTime)}</div>
                      </td>
                      <td id={empsalary.wtime}>
                        <div>{gettime(trackerInfo[id].workingTime)}</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Salary;
