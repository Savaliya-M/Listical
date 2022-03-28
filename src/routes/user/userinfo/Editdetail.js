import React, { useState, useEffect } from "react";
import edit from "./editdetail.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import appRef from "../../../firebase";
import { v4 as uuidv4 } from "uuid";

const Editdetail = () => {
  const [skill, setSkill] = useState({});
  const [user, setUser] = useState({
    name: "",
    email: "",
    mono: "",
    address: "",
    dob: "",
    gender: "",
    degree: "",
    colname: "",
    post: "",
    precompany: "",
    preworkduration: "",
    otherdetail: "",
    skill: [],
    position: "",
    pass: "",
    langknown: { English: "", Hindi: "", Gujarati: "" },
    role: "",
    activate: false,
    uuid: uuidv4(),
    hiringdate: Date(),
  });
  const { id } = useParams();
  useEffect(() => {
    appRef.child(`Users/${id}`).on("value", (snap) => {
      setUser(snap.val());
    });
  }, [id]);

  const skillchange = (e) => {
    setSkill(e.target.value);
  };
  const skillplus = (e) => {
    e.preventDefault();
    if (skill) {
      setUser({ ...user, skill: [...user.skill, skill] });
    }
  };
  const getuser = (event) => {
    if (
      event.target.name === "English" ||
      event.target.name === "Hindi" ||
      event.target.name === "Gujarati"
    ) {
      if (event.target.checked) {
        setUser({
          ...user,
          langknown: {
            ...user.langknown,
            [event.target.name]: event.target.value,
          },
        });
      } else {
        setUser({
          ...user,
          langknown: {
            ...user.langknown,
            [event.target.name]: "",
          },
        });
      }
    }
    // else if (event.target.name === "skill") {
    //   setUser({ ...user, skill: [...user.skill, event.target.value] });
    // }
    else {
      setUser({ ...user, [event.target.name]: event.target.value });
    }
  };
  const navigate = useNavigate();

  const senduserdata = (e) => {
    e.preventDefault();
    appRef.child(`Users/${id}`).set(user, () => {
      alert("data Updated successfully");
      setUser({
        name: "",
        email: "",
        mono: "",
        address: "",
        dob: "",
        gender: "",
        degree: "",
        colname: "",
        post: "",
        precompany: "",
        preworkduration: "",
        otherdetail: "",
        skill: [],
        position: "",
        pass: "",
        langknown: { English: "", Hindi: "", Gujarati: "" },
        role: "",
        activate: false,
      });
    });
    navigate(-1);
  };

  return (
    <>
      <div className={edit.editpage}>
        <div>
          <div className={edit.part}>
            <div>
              <div className={edit.uicon}>
                <img src={require("@photos/man.png")} alt="logo" />
                <div className={edit.infolist}>
                  <h3>{user.name}</h3>
                </div>
                <div className={edit.cardlogo}>
                  {user.email}
                </div>
                <div className={edit.cardlogo}>
                  +91 {user.mono}
                </div>
              </div>
            </div>

            {/* <h1>Profile Setting</h1> */}
            <form action="#">
              <div className={edit.form}>
                <div className={edit.formpart1}>
                  <div className={edit.detalis}>
                    <div className={edit.personal}>
                      <h3 id={edit.sticky}> Personal Detail </h3>
                      <div className={edit.name}>
                        <div className={edit.tag}>
                          Full name
                        </div>
                        <div id={edit.inputbox}>
                          <input
                            id={edit.text}
                            placeholder="Johan Roy"
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={getuser}
                          />
                        </div>
                      </div>
                      <div className={edit.email}>
                        <div className={edit.tag}>
                          Mail-id
                        </div>
                        <div id={edit.inputbox}>
                          <input
                            id={edit.text}
                            placeholder="Listical@gmail.com"
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={getuser}
                          />
                        </div>
                      </div>
                      <div className={edit.mobile}>
                        <div className={edit.tag}>
                          Mobile No.
                        </div>
                        <div id={edit.inputbox}>
                          <input
                            id={edit.text}
                            placeholder="+91 99999 00009"
                            type="text"
                            name="mono"
                            value={user.mono}
                            onChange={getuser}
                          />
                        </div>
                      </div>
                      <div className={edit.address}>
                        <div className={edit.tag}>
                          Address
                        </div>
                        <div id={edit.inputbox}>
                          <textarea
                            id={edit.areaoftext}
                            placeholder="Address"
                            name="address"
                            value={user.address}
                            onChange={getuser}
                            cols="21"
                            rows="2"
                          ></textarea>
                        </div>
                      </div>
                      <div className={edit.dob}>
                        <div className={edit.tag}>
                          DOB
                        </div>
                        <div id={edit.inputbox}>
                          <input
                            id={edit.text}
                            type="date"
                            name="dob"
                            value={user.dob}
                            onChange={getuser}
                          />
                        </div>
                      </div>
                      <div className={edit.gender}>
                        <div className={edit.tag}>
                          Gender
                        </div>
                        <div id={edit.inputbox}>
                          <input
                            type="radio"
                            value="Male"
                            name="gender"
                            checked={user.gender === "Male"}
                            onChange={getuser}
                          />{" "}
                          Male
                          <input
                            type="radio"
                            value="Female"
                            name="gender"
                            checked={user.gender === "Female"}
                            onChange={getuser}
                          />{" "}
                          Female
                          <input
                            type="radio"
                            value="Other"
                            name="gender"
                            checked={user.gender === "Other"}
                            onChange={getuser}
                          />{" "}
                          Other
                        </div>
                      </div>
                    </div>

                    <div className={edit.qualification}>
                      <h3>Qualification & Skill :</h3>
                      <div className={edit.degree}>
                        <div className={edit.tag}>
                          Degree
                        </div>
                        <div id={edit.inputbox}>
                          <input
                            id={edit.text}
                            placeholder="Degree"
                            type="text"
                            name="degree"
                            value={user.degree}
                            onChange={getuser}
                          />
                        </div>
                      </div>
                      <div className={edit.collage}>
                        <div className={edit.tag}>
                          College Name
                        </div>
                        <div id={edit.inputbox}>
                          <input
                            id={edit.text}
                            placeholder="College Name"
                            type="text"
                            name="colname"
                            value={user.colname}
                            onChange={getuser}
                          />
                        </div>
                      </div>
                      <div className={edit.langbox}>
                        <div className={edit.tag}>
                          Language Known
                        </div>
                        <div id={edit.inputbox}>
                          <input
                            type="checkbox"
                            value="English"
                            name="English"
                            checked={
                              user.langknown.English === "English" ? true : false
                            }
                            onChange={getuser}
                          />{" "}
                          English
                          <input
                            type="checkbox"
                            value="Hindi"
                            name="Hindi"
                            checked={user.langknown.Hindi === "Hindi" ? true : false}
                            onChange={getuser}
                          />{" "}
                          Hindi
                          <input
                            type="checkbox"
                            value="Gujarati"
                            name="Gujarati"
                            checked={
                              user.langknown.Gujarati === "Gujarati" ? true : false
                            }
                            onChange={getuser}
                          />{" "}
                          Gujarati
                        </div>
                      </div>
                      <div className={edit.skill}>
                        <div className={edit.tag}>
                          Skill
                        </div>
                        <div id={edit.inputbox}>
                          <input
                            id={edit.skilltext}
                            placeholder="Skill"
                            type="text"
                            name="skill"
                            onChange={skillchange}
                          />
                          <button id={edit.skillbutton}
                            onClick={skillplus}>+</button>
                        </div>

                        <div className={edit.skillname}>
                          {user.skill.map((name) => (
                            <p key={name}>
                              <div>{name}</div></p>
                          ))}
                        </div>

                      </div>
                    </div>

                    <div className={edit.Work}>
                      <h3>Work Experience : </h3>
                      <div className={edit.post}>
                        <div className={edit.tag}>
                          Post
                        </div>
                        <div id={edit.inputbox}>
                          <input
                            id={edit.text}
                            placeholder="Devloper"
                            type="text"
                            name="post"
                            value={user.post}
                            onChange={getuser}
                          />
                        </div>
                      </div>
                      <div className={edit.company}>
                        <div className={edit.tag}>
                          Company Name
                        </div>
                        <div id={edit.inputbox}>
                          <input
                            id={edit.text}
                            placeholder="Company Name"
                            type="text"
                            name="precompany"
                            value={user.precompany}
                            onChange={getuser}
                          />
                        </div>
                      </div>
                      <div className={edit.duration}>
                        <div className={edit.tag}>
                          Work Duration
                        </div>
                        <div id={edit.inputbox}>
                          <input
                            id={edit.text}
                            placeholder="Work Duration"
                            type="text"
                            name="preworkduration"
                            value={user.preworkduration}
                            onChange={getuser}
                          />
                        </div>
                      </div>
                      <div className={edit.other}>
                        <div className={edit.tag}>
                          Other detail
                        </div>
                        <div id={edit.inputbox}>
                          <textarea
                            id={edit.areaoftext}
                            placeholder=" Other detail"
                            cols="21"
                            rows="5"
                            name="otherdetail"
                            value={user.otherdetail}
                            onChange={getuser}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={edit.formpart2}>
                  <div>
                    <div className={edit.Profile}>
                      <h3>Complete Your Profile :</h3>
                      <div className={edit.role}>
                        <div className={edit.tag}>
                          Role
                        </div>
                        <div id={edit.inputbox}>
                          <input
                            id={edit.text}
                            type="text"
                            placeholder="Devloper"
                            value={user.role}
                            name="role"
                            onChange={getuser}
                          />
                        </div>
                      </div>
                      <div className={edit.position}>
                        <div className={edit.tag}>
                          Position
                        </div>
                        <div id={edit.inputredio}>
                          <input
                            id={edit.rediobtn}
                            type="radio"
                            value="Admin"
                            name="position"
                            checked={user.position === "Admin"}
                            onChange={getuser}
                          />{" "}
                          Admin
                          <input
                            id={edit.rediobtn}
                            type="radio"
                            value="Manager"
                            name="position"
                            checked={user.position === "Manager"}
                            onChange={getuser}
                          />{" "}
                          Manager
                          <input
                            id={edit.rediobtn}
                            type="radio"
                            value="Employee"
                            name="position"
                            checked={user.position === "Employee"}
                            onChange={getuser}
                          />{" "}
                          Employee
                        </div>
                      </div>
                      <div className={edit.password}>
                        <div className={edit.tag}>
                          Password
                        </div>
                        <div id={edit.inputbox}>
                          <input
                            id={edit.text}
                            placeholder="Password"
                            type="password"
                            name="pass"
                            value={user.pass}
                            onChange={getuser}
                            autoComplete="on"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={edit.btn}>
                    <button onClick={senduserdata}>Save</button>
                    <input type="reset" value="Reset" />
                  </div>
                </div>


              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Editdetail;
