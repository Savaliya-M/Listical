import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useinfo from "./userinfo.module.scss";
import appRef from "../../../firebase";
import { useParams } from "react-router-dom";

const Userinfo = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState({});
  const [langknow, setLangknow] = useState([]);
  const [skill, setSkill] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    appRef.child(`Users/${id}`).on("value", (snapshot) => {
      setUser(snapshot.val());
    });
  }, []);

  useEffect(() => {
    if (user.langknown) {
      setLangknow(Object.values(user.langknown));
    }
  }, [user]);

  useEffect(() => {
    if (user.skill) {
      setSkill(user.skill);
    }
  }, [user]);

  return (
    <>
      <div className={useinfo.mainuserinfo}>
        <div className={useinfo.secuserinfo}>
          <button
            onClick={() => {
              navigate("/layout/user");
            }}
          >
            Back
          </button>
          <div className={useinfo.thirduserinfo}>
            <div className={useinfo.basicdetail}>
              <div className={useinfo.detailtext}>
                <h1>{user.name}</h1>
                <p>{user.post}</p>
                <p>{user.mono}</p>
                <p>{user.email}</p>
                <h4>
                  {user.degree}({user.colname})
                </h4>
                <h3>Language Known</h3>
                {langknow.map((elem) => {
                  if (elem !== "") {
                    return <li key={elem}>{elem}</li>;
                  }
                })}
                <div className={useinfo.workexperience}>
                  <h3>WORK EXPERIENCE</h3>
                  <h4>{user.post} </h4>
                  <h5>{user.precompany}</h5>
                  <p>{user.preworkduration}</p>
                  <p>{user.otherdetail}</p>
                </div>
                <h3>SKILL</h3>
                {skill.map((elem) => {
                  return <li key={elem}>{elem}</li>;
                })}
                <div className={useinfo.btnsalary}>
                  <button>Salary</button>
                </div>
              </div>
              <div className={useinfo.personimage}>
                <img src={require("@photos/person.jpg")} alt="person" />
              </div>
            </div>

            <div className={useinfo.managername}>
              <h3>Managed by : Rahulkumar</h3>
            </div>

            <div className={useinfo.fiterprouwise}>
              <div className={useinfo.filbtn}>
                <button>Runing</button>
                <button>Completed</button>
                <button>Pending</button>
              </div>
            </div>

            <div className={useinfo.projectbox}>
              <div className={useinfo.projectwise}>
                <h1>LMS</h1>
                <p>manish shah</p>
                <p>Creted Backend for LMS</p>
                <p>starting date: 12-10-2022</p>
                <p>ending date: 13-10-2022</p>
              </div>
              <div className={useinfo.projectwise}>
                <h1>LMS</h1>
                <p>manish shah</p>
                <p>Creted Backend for LMS</p>
                <p>starting date: 12-10-2022</p>
                <p>ending date: 13-10-2022</p>
              </div>
              <div className={useinfo.projectwise}>
                <h1>LMS</h1>
                <p>manish shah</p>
                <p>Creted Backend for LMS</p>
                <p>starting date: 12-10-2022</p>
                <p>ending date: 13-10-2022</p>
              </div>
              <div className={useinfo.projectwise}>
                <h1>LMS</h1>
                <p>manish shah</p>
                <p>Creted Backend for LMS</p>
                <p>starting date: 12-10-2022</p>
                <p>ending date: 13-10-2022</p>
              </div>
              <div className={useinfo.projectwise}>
                <h1>LMS</h1>
                <p>manish shah</p>
                <p>Creted Backend for LMS</p>
                <p>starting date: 12-10-2022</p>
                <p>ending date: 13-10-2022</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Userinfo;
