import React, { useState } from "react";
import appRef from "../../../firebase";
import addholi from "./addholiday.module.scss";

const Addholiday = ({ handleclose }) => {
  const [holiday, setHoliday] = useState({
    holidaytitle: "",
    holidaydate: "",
  });

  const sendholiday = (e) => {
    setHoliday({ ...holiday, [e.target.name]: e.target.value });
  };

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
      <div className={addholi.popup}>
        <div className={addholi.outer}>
          <div className={addholi.close}>
            <button onClick={handleclose}>X</button>
          </div>
          <div className={addholi.mainpropopup}>
            <div className={addholi.mid}>
              <div className={addholi.center}>
                <div className={addholi.title}>
                  <h1>ADD Holiday</h1>
                </div>

                <div>
                  <div>
                    <div>
                      <h3> Holiday Title</h3>
                      <input
                        type="text"
                        name="holidaytitle"
                        onChange={sendholiday}
                        value={holiday.holidaytitle}
                      ></input>
                    </div>
                    <div>
                      <h3> Holiday Date</h3>
                      <input
                        type="date"
                        name="holidaydate"
                        onChange={sendholiday}
                        value={holiday.holidaydate}
                      ></input>
                    </div>
                    <div className={addholi.fildsbtn}>
                      <button id={addholi.btn1} onClick={storeholiday}>
                        Submit
                      </button>{" "}
                      <button id={addholi.btn1}>Reset</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addholiday;
