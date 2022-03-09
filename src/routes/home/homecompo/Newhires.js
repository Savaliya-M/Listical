import React from 'react';
import nhire from "./homecompo.module.scss";

const Newhires = () => {
  return (
    <>
        <div className={nhire.mainhomecompo} id={nhire.Newhires}>
        <div className={nhire.head} id={nhire.Newhires}>
          <h3>New Hires</h3>
          <button>+</button>
        </div>
        <div className={nhire.mainContent}>
        <div className={nhire.content} id={nhire.Newhires}>
          <div className={nhire.cimg}>
            <h2>S</h2>
          </div>
          <div className={nhire.text}>
            <h3>Smit Kakadiya</h3>
            <p>DevOps Engineer</p>
          </div>
        </div>
        </div>
      </div>
    </>
    );
};

export default Newhires;
