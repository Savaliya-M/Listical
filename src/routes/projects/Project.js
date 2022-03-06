import React, { useState } from "react";
import proj from "./project.module.scss";
import Addprojectpopup from "./Addprojectpopup";
import Projectcompo from "./Projectcompo";

const Project = () => {
  const [proPopUp, setProPopUp] = useState(false);

  const togglepopup = () => {
    setProPopUp(!proPopUp);
  };
  return (
    <>
      <div className={proj.wraperproject}>
        <div className={proj.btn}>
          <button onClick={togglepopup}>ADD PROJECT</button>
        </div>
        <div className={proj.mainproject}>
          <Projectcompo />
          <Projectcompo />
          <Projectcompo />
          <Projectcompo />
          <Projectcompo />
          <Projectcompo />
        </div>
        {proPopUp && <Addprojectpopup handleclose={togglepopup} />}
      </div>
    </>
  );
};

export default Project;
