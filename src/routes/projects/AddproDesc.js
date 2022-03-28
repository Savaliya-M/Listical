import React, { useState, useEffect } from "react";
import appRef from "../../firebase";

const AddproDesc = ({ handleclose, pid }) => {
  const [frontTech, setFrontTech] = useState([]);
  const [backTech, setBackTech] = useState({
    prolang: "",
    framework: "",
    webserver: "",
    database: "",
  });
  const [front, setFront] = useState({ tech: "" });
  const frontaddclick = () => {
    setFrontTech([...frontTech, front.tech]);
    setFront({ tech: "" });
  };
  const backChange = (e) => {
    setBackTech({ ...backTech, [e.target.name]: e.target.value });
  };
  const frontchange = (e) => {
    setFront({ [e.target.name]: e.target.value });
  };
  const techAddClick = () => {
    appRef.child(`Projects/${pid}`).on("value", (snap) => {
      let data = snap.val();
      data.frontEnd = frontTech;
      data.backEnd = backTech;
      appRef.child(`Projects/${pid}`).set(data);
    });
  };

  return (
    <>
      <div>
        <button onClick={handleclose}>Back</button>
        <div>
          <h4>frontend Technologies</h4>
          programing lang.:
          <input
            type="text"
            name="tech"
            onChange={frontchange}
            value={front.tech}
          />
          <button onClick={frontaddclick}>+</button>
          {Object.values(frontTech).map((data) => (
            <p key={data}>{data}</p>
          ))}
        </div>
        <div>
          <h4>backend Technologies</h4>
          <p>programing lang. :</p>
          <input
            type="text"
            name="prolang"
            value={backTech.prolang}
            onChange={backChange}
          />
          <p> Framework :</p>
          <input
            type="text"
            name="framework"
            value={backTech.framework}
            onChange={backChange}
          />
          <p> Web Server :</p>
          <input
            type="text"
            name="webserver"
            value={backTech.webserver}
            onChange={backChange}
          />
          <p> Database:</p>
          <input
            type="text"
            name="database"
            value={backTech.database}
            onChange={backChange}
          />
          <button onClick={techAddClick}>Save</button>
        </div>
      </div>
    </>
  );
};

export default AddproDesc;
