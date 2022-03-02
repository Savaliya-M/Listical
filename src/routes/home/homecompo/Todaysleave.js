import React from 'react';
import './homecompo.css';

const Todaysleave = () => {
  return (
    <>
      <div className="mainhomecompo" id="Todaysleave">
        <div className="head" id="Todaysleave">
          <h4>Todays Leave</h4>
        </div>
        <div className="mainContent">
        <div className="content" id="Todaysleave">
          <div className="cimg">
            <h2>M</h2>
          </div>
          <div className="text">
            <h3>Mahesh Patel</h3>
            <p>Technical Lead, Engineering</p>
          </div>
        </div>
        <div className="content" id="Todaysleave">
          <div className="cimg">
            <h2>S</h2>
          </div>
          <div className="text">
            <h3>Sager pandey</h3>
            <p>softwere devloper</p>
          </div>
        </div>
        <div className="content" id="Todaysleave">
          <div className="cimg">
            <h2>R</h2>
          </div>
          <div className="text">
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
