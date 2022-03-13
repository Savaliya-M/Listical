import React, { useState, useEffect } from "react";
import nhire from "./homecompo.module.scss";

const Newhires = (props) => {
  const [hireList, setHireList] = useState([]);
  useEffect(() => {
    setHireList(props.newHires);
  }, [props]);
  return (
    <>
      <div className={nhire.mainhomecompo} id={nhire.Newhires}>
        <div className={nhire.head} id={nhire.Newhires}>
          <h3>New Hires</h3>
        </div>
        <div className={nhire.scroll}>
        {hireList && hireList.length !== 0
          ? hireList.map((user, index) => {
              return (
                <div className={nhire.mainContent} key={index}>
                  <div className={nhire.content} id={nhire.Newhires}>
                    <div className={nhire.cimg}>
                      <h2>{user.name[0]}</h2>
                    </div>
                    <div className={nhire.text}>
                      <h3>{user.name}</h3>
                      <p>{user.post}</p>
                    </div>
                  </div>
                </div>
              );
            })
          : "noHire today"}
          </div>
      </div>
    </>
  );
};

export default Newhires;
