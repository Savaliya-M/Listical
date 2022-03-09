import { React, useState, useEffect } from "react";
import anniversary from "./homecompo.module.scss";

const Workanniversary = (props) => {
  const [todayList, setTodayList] = useState([]);
  useEffect(() => {
    setTodayList(props.anniversaryList);
  }, [props]);

  return (
    <>
      <div
        className={anniversary.mainhomecompo}
        id={anniversary.Workanniversary}
      >
        <div className={anniversary.head} id={anniversary.Workanniversary}>
          <h3>Work Anniversary</h3>
          <button>+</button>
        </div>
        <div className={anniversary.mainContent}>
          {todayList && todayList.length !== 0
            ? todayList.map((user, index) => {
                return user.isAnniversary ? (
                  <div
                    className={anniversary.content}
                    id={anniversary.Workanniversary}
                    key={index}
                  >
                    <div className={anniversary.cimg}>
                      <h2>{user.yearsOfJoined}</h2>
                    </div>
                    <div className={anniversary.text}>
                      <h3>{user.name}</h3>
                      <p>{user.post}</p>
                    </div>
                  </div>
                ) : null;
              })
            : "no anniversary today"}
        </div>
      </div>
    </>
  );
};

export default Workanniversary;
