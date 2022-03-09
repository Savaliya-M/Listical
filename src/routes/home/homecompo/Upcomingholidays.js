import React from 'react';
import holiday from "./homecompo.module.scss";

const Upcomingholidays =()=> {
  return (
    <>
        <div className={holiday.mainhomecompo} id={holiday.Upcomingholidays}>
        <div className={holiday.head} id={holiday.Upcomingholidays}>
          <h3>Upcoming Holidays</h3>
          <button>+</button>
        </div>
        <div className={holiday.mainContent}>
        <div className={holiday.content} id={holiday.Upcomingholidays}>
          <div className={holiday.cimg}>
            <h2>R</h2>
          </div>
          <div className={holiday.text}>
            <h3>Republic Day</h3>
            <p>26 january 2022 (wednesday)</p>
          </div>
        </div>
        </div>
      </div>
    </>
    );
};

export default Upcomingholidays;
