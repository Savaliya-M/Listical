import React from 'react';
import birth from "./homecompo.module.scss";


const Birthday = () => {
  return (
    <>
      <div className={birth.mainhomecompo} id={birth.Birthday}>
        <div className={birth.head} id={birth.Birthday}>
          <h3>Birthday</h3>
          <button>+</button>
        </div>
        <div className={birth.mainContent}>
          <div className={birth.content} id={birth.Birthday}>
            <div className={birth.cimg}>
              <h2>M</h2>
            </div>
            <div className={birth.text}>
              <h3>Mitulkumar Savaliya</h3>
              <p>head of department</p>
            </div>
          </div>
          <div className={birth.content} id={birth.Birthday}>
            <div className={birth.cimg}>
              <h2>A</h2>
            </div>
            <div className={birth.text}>
              <h3>Anilkumar kakadiya</h3>
              <p>head of department</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Birthday;
