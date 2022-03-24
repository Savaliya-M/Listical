import { React, useState, useEffect } from "react";
import birth from "./homecompo.module.scss";

const Birthday = ({ birthdayList }) => {
  const [todayList, setTodayList] = useState([]);
  useEffect(() => {
    setTodayList(birthdayList);
  }, [birthdayList]);

  return (
    <>
      <div className={birth.mainhomecompo} id={birth.Birthday}>
        <div className={birth.head} id={birth.Birthday}>
          <h3>Birthday</h3>
        </div>
        <div className={birth.scroll}>
          {todayList && todayList.length !== 0
            ? todayList.map((user, index) => {
                return user.isBirthdate ? (
                  <div
                    className={birth.content}
                    id={birth.Birthday}
                    key={index}
                  >
                    <div className={birth.cimg}>
                      <h2>{user.name[0]}</h2>
                    </div>
                    <div className={birth.text}>
                      <h3>{user.name}</h3>
                      <p>{user.role}</p>
                    </div>
                  </div>
                ) : null;
              })
            : "no Birthday today"}
        </div>
      </div>
    </>
  );
};

export default Birthday;
