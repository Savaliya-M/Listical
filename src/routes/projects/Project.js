import React, { useState } from "react";
import Addprojectpopup from "./Addprojectpopup";
import "./project.css";
import Projectcompo from "./Projectcompo";

const Project = () => {
  const [proPopUp, setProPopUp] = useState(false);

  const togglepopup = () => {
    setProPopUp(!proPopUp);
  };
  return (
    <>
      <div className="wraperproject">
        <div className="btn">
          <button onClick={togglepopup}>ADD PROJECT</button>
        </div>
        <div className="mainproject">
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
