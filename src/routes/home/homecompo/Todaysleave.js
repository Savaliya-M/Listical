import React from 'react';
import leave from "./homecompo.module.scss";

const Todaysleave = () => {
  return (
    <>
      <div className={leave.mainhomecompo} id={leave.Todaysleave}>
        <div className={leave.head} id={leave.Todaysleave}>
          <h3>Todays Leave</h3>
        </div>
        <div className={leave.mainContent}>
        <div className={leave.content} id={leave.Todaysleave}>
          <div className={leave.cimg}>
            <h2>M</h2>
          </div>
          <div className={leave.text}>
            <h3>Mahesh Patel</h3>
            <p>Technical Lead, Engineering</p>
          </div>
        </div>
        <div className={leave.content} id={leave.Todaysleave}>
          <div className={leave.cimg}>
            <h2>S</h2>
          </div>
          <div className={leave.text}>
            <h3>Sager pandey</h3>
            <p>softwere devloper</p>
          </div>
        </div>
        <div className={leave.content} id={leave.Todaysleave}>
          <div className={leave.cimg}>
            <h2>R</h2>
          </div>
          <div className={leave.text}>
            <h3>Rahul Patel</h3>
            <p>fontend devloper</p>
          </div>
        </div>
        </div>

      </div>
    </>
  );
};

export default Todaysleave;
