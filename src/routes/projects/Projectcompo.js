import React from "react";
import procomp from "./projectcompo.module.scss";

const Projectcompo = () => {
  return (
    <>
      <div>
        <div className={procomp.mainprojectcompo} id={procomp.Projectdetail}>
          <div className={procomp.probox}>
            <div className={procomp.progressreport}>
              <img
                src={require("@photos/peichart.jpg")}
                alt="this is pie chart"
              />
            </div>
            <div className={procomp.proinfo}>
              <div className={procomp.proname}>
                <h3>Project:</h3>
                <h3>LMS</h3>
              </div>
              <div className={procomp.clientname}>
                <h4>Client Name:</h4>
                <h4>chimanbhai mehata </h4>
              </div>
              <div className={procomp.deadline}>
                <h4>Deadline:</h4>
                <h4>13/02/2022</h4>
              </div>
              <div className={procomp.managername}>
                <h4>Manager Name:</h4>
                <h4>Shyam lal</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Projectcompo;
