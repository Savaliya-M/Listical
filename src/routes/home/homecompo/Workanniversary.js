import React from 'react';
import anniversary from "./homecompo.module.scss";

const Workanniversary = () => {
  return (
    <>
        <div className={anniversary.mainhomecompo} id={anniversary.Workanniversary}>
        <div className={anniversary.head} id={anniversary.Workanniversary}>
          <h3>Work Anniversary</h3>
        </div>
        <div className={anniversary.mainContent}>
        <div className={anniversary.content} id={anniversary.Workanniversary}>
          <div className={anniversary.cimg}>
            <h2>P</h2>
          </div>
          <div className={anniversary.text}>
            <h3>Parth Lathiya</h3>
            <p>Senior Quality Assurance Engineer</p>
          </div>
        </div>
        </div>
      </div>
    </>
    );
};

export default Workanniversary;
