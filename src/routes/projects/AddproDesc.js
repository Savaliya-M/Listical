import React, { useState, useEffect } from "react";
import appRef from "../../firebase";
import prodes from "./addproDesc.module.scss";

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
      <div className={prodes.popup}>
        <div className={prodes.outer}>
          <div className={prodes.close}>
            <button onClick={handleclose}>X</button>
          </div>
          <div className={prodes.mainpropopup}>
            <div className={prodes.mid}>
              <div className={prodes.center}>
                <div className={prodes.title}>
                  <h1>Add Project Description</h1>
                </div>

                <div className={prodes.fields}>
                  <div>
                    <h2>Frontend Technologies</h2>
                    <div className={prodes.frontend}>
                      <h3>Programing Lang</h3>
                      <div>
                        <input
                          className={prodes.fieldsinput}
                          type="text"
                          name="tech"
                          onChange={frontchange}
                          value={front.tech}
                        />
                        <button className={prodes.addbtn}
                          onClick={frontaddclick}>+</button>
                        <div className={prodes.addata}>
                          {Object.values(frontTech).map((data) => (
                            <p key={data}>{data}</p>
                          ))}
                        </div>


                      </div>
                    </div>
                  </div>
                  <div>
                    <h2>Backend Technologies</h2>
                    <div className={prodes.backend}>
                      <div>
                        <h3>Programing Lang.</h3>
                        <input
                          className={prodes.fieldsinput}
                          type="text"
                          name="prolang"
                          value={backTech.prolang}
                          onChange={backChange}
                        />
                      </div>
                      <div>
                        <h3> Framework</h3>
                        <input
                          className={prodes.fieldsinput}
                          type="text"
                          name="framework"
                          value={backTech.framework}
                          onChange={backChange}
                        />
                      </div>
                      <div>
                        <h3> Web Server</h3>
                        <input
                          className={prodes.fieldsinput}
                          type="text"
                          name="webserver"
                          value={backTech.webserver}
                          onChange={backChange}
                        />
                      </div>
                      <div>
                        <h3> Database</h3>
                        <input
                          className={prodes.fieldsinput}
                          type="text"
                          name="database"
                          value={backTech.database}
                          onChange={backChange}
                        />
                      </div>
                    </div>
                    <div>
                      <button className={prodes.fieldsbtn}
                        onClick={techAddClick}>Save</button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddproDesc;
