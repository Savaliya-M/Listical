import React, { useState, useEffect } from "react";
import appRef from "../../../firebase";

const Addholiday = (props) => {
  const [holiday, setHoliday] = useState({
    holidaytitle: "",
    holidaydate: "",
  });

  const sendholiday = (e) => {
    setHoliday({ ...holiday, [e.target.name]: e.target.value });
  };
  console.log(holiday);

  const storeholiday = (e) => {
    e.preventDefault();
    appRef.child("Holiday").push(holiday, () => {
      alert("Holiday set Successfully");
      setHoliday({
        holidaytitle: "",
        holidaydate: "",
      });
    });
  };

  return (
    <>
      <div>
        <div>
          <div>
            <h1>ADD Holiday</h1>
            <button onClick={props.handleclose}>X</button>
          </div>

          <div>
            <div>
              <div>
                <h3> Holiday Title : </h3>
                <input
                  type="text"
                  name="holidaytitle"
                  onChange={sendholiday}
                  value={holiday.holidaytitle}
                ></input>
              </div>
              <div>
                <h3> Holiday Date : </h3>
                <input
                  type="date"
                  name="holidaydate"
                  onChange={sendholiday}
                  value={holiday.holidaydate}
                ></input>
              </div>
              <div>
                <button onClick={storeholiday}>Submit</button>{" "}
                <button>Reset</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addholiday;
