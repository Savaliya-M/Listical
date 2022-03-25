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
  // const [user, setUser] = useState({});
  const { id } = useParams();
  useEffect(() => {
    appRef.child(`Users/${id}`).on("value", (snap) => {
      setUser(snap.val());
    });
  }, [id]);
  useEffect(() => {}, [user]);

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
    console.log(user);
    //   appRef.child("Users").push(user, () => {
    //     alert("data inserted successfully");
    //     setUser({
    //       name: "",
    //       email: "",
    //       mono: "",
    //       address: "",
    //       dob: "",
    //       gender: "",
    //       degree: "",
    //       colname: "",
    //       post: "",
    //       precompany: "",
    //       preworkduration: "",
    //       otherdetail: "",
    //       skill: [],
    //       position: "",
    //       pass: "",
    //       langknown: { English: "", Hindi: "", Gujarati: "" },
    //       role: "",
    //       activate: false,
    //     });
    //   });
    //   navigate("/");
  };

  return (
    <>
      <div>
        <div>
          <div>
            <h1> Sign-Up</h1>
            <form action="#">
              <h3> Personal Detail :</h3>
              <div className={edit.name}>
                Full name
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
                Mail-id
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
                Mobile No.
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
                Address
                <div id={edit.inputbox}>
                  <textarea
                    id={edit.text}
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
                DOB
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
                Gender
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

              <h3>Qualification & Skill :</h3>

              <div className={edit.degree}>
                Degree
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
                College Name
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
                Language Known
                <div id={edit.inputbox}>
                  <input
                    type="checkbox"
                    value="English"
                    name="English"
                    onChange={getuser}
                  />{" "}
                  English
                  <input
                    type="checkbox"
                    value="Hindi"
                    name="Hindi"
                    onChange={getuser}
                  />{" "}
                  Hindi
                  <input
                    type="checkbox"
                    value="Gujarati"
                    name="Gujarati"
                    onChange={getuser}
                  />{" "}
                  Gujarati
                </div>
              </div>
              <div className={edit.skill}>
                Skill
                <div id={edit.inputbox}>
                  <input
                    id={edit.text}
                    placeholder="Skill"
                    type="text"
                    name="skill"
                    onChange={skillchange}
                  />
                  <button onClick={skillplus}>+</button>
                </div>
                {user.skill.map((name) => (
                  <p key={name}>{name}</p>
                ))}
              </div>
              <h3>Work Experience : </h3>
              <div className={edit.post}>
                Post
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
                Company Name
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
                Work Duration
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
                Other detail
                <div id={edit.inputbox}>
                  <textarea
                    id={edit.text}
                    placeholder=" Other detail"
                    cols="21"
                    rows="5"
                    name="otherdetail"
                    value={user.otherdetail}
                    onChange={getuser}
                  ></textarea>
                </div>
              </div>
              <h3>Complete Your Profile :</h3>
              <div className={edit.role}>
                Role
                <div id={edit.inputbox}>
                  <input
                    type="text"
                    placeholder="Devloper"
                    value={user.role}
                    name="role"
                    onChange={getuser}
                  />
                </div>
              </div>
              <div className={edit.position}>
                Position
                <div id={edit.inputbox}>
                  <input
                    type="radio"
                    value="Admin"
                    name="position"
                    checked={user.position === "Admin"}
                    onChange={getuser}
                  />{" "}
                  Admin
                  <input
                    type="radio"
                    value="Manager"
                    name="position"
                    checked={user.position === "Manager"}
                    onChange={getuser}
                  />{" "}
                  Manager
                  <input
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
                Password
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
              <div className={edit.btn}>
                <button onClick={senduserdata}>Save</button>
                <input type="reset" value="Reset" />
              </div>
            </form>
          </div>
          {/* <div className={edit.otherpart}>
            <img src={require("@photos/Listical.png")} alt="" />
            <h2>Listical</h2>
            <h1>Welcome Back!</h1>
            <div className={edit.login}>
              <Link
                className={edit.btn1}
                to={"/"}
                style={{ textDecoration: "none" }}
              >
                Login page
              </Link>
            </div>
          </div> */}
        </div>
        <div className={edit.bgcolor}>
          <div className={edit.color}></div>
        </div>
      </div>
    </>
  );
};

export default Editdetail;
