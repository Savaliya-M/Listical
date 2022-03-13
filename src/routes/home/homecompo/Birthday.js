import { React, useState, useEffect } from "react";
import birth from "./homecompo.module.scss";

const Birthday = (props) => {
  const [todayList, setTodayList] = useState([]);
  useEffect(() => {
    setTodayList(props.birthdayList);
  }, [props]);

  return (
    <>
      <div className={birth.mainhomecompo} id={birth.Birthday}>
        <div className={birth.head} id={birth.Birthday}>
          <h3>Birthday</h3>
        </div>
        {/* <div className={birth.mainContent}> */}
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
                      <p>{user.post}</p>
                    </div>
                  </div>
                ) : null;
              })
            : "no Birthday today"}
            </div>
        </div>
      {/* </div> */}
    </>
  );
};

export default Birthday;
