import React, { useState } from "react";
import signup from './signup.module.scss';
import { Link, useNavigate } from "react-router-dom";
import appRef from "../../firebase";
import { v4 as uuidv4 } from "uuid";

const Signup = () => {
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
    activate: false,
    uuid: uuidv4(),
    hiringdate: Date(),
  });
  const skillchange = (e) => {
    setSkill(e.target.value);
  };
  const skillplus = (e) => {
    e.preventDefault();
    setUser({ ...user, skill: [...user.skill, skill] });
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
    } else if (event.target.name === "skill") {
      setUser({ ...user, skill: [...user.skill, event.target.value] });
    } else {
      setUser({ ...user, [event.target.name]: event.target.value });
    }
  };
  const navigate = useNavigate();

  const senduserdata = (e) => {
    e.preventDefault();
    appRef.child("Users").push(user, () => {
      alert("data inserted successfully");
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
        activate: false,
      });
    });
    // console.log(user);
    navigate("/");
  };

  return (
    <>
      <div className={signup.signuppage}>
        <div className={signup.signupcontainer}>
          <div className={signup.signupform}>
            <h1> Sign-Up</h1>
            <form action="#">

              <div className={signup.name}>
                Full name
                <div id={signup.inputbox}>
                  <input id={signup.text}
                    placeholder="Full name"
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={getuser}
                  />
                </div>
              </div>

              <div className={signup.email}>
                Mail-id
                <div id={signup.inputbox}>
                  <input id={signup.text}
                    placeholder=" Mail-id"
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={getuser}
                  />
                </div>
              </div>

              <div className={signup.mobile}>
                Mobile No.
                <div id={signup.inputbox}>
                  <input id={signup.text}
                    placeholder="Mobile No."
                    type="text"
                    name="mono"
                    value={user.mono}
                    onChange={getuser}
                  />
                </div>
              </div>

              <div className={signup.address}>
                Address
                <div id={signup.inputbox}>
                  <textarea id={signup.text}
                    placeholder="Address"
                    name="address"
                    value={user.address}
                    onChange={getuser}
                    cols="21"
                    rows="2"
                  ></textarea>
                </div>
              </div>

              <div className={signup.dob}>
                DOB
                <div id={signup.inputbox}>
                  <input
                    id={signup.text}
                    type="date"
                    name="dob"
                    value={user.dob}
                    onChange={getuser}
                  />
                </div>
              </div>

              <div className={signup.gender}>
                Gender
                <div id={signup.inputbox}>
                  <input
                    type="radio"
                    value="Male"
                    name="gender"
                    onChange={getuser}

                  />{" "}
                  Male
                  <input
                    type="radio"
                    value="Female"
                    name="gender"
                    onChange={getuser}
                  />{" "}
                  Female
                  <input
                    type="radio"
                    value="Other"
                    name="gender"
                    onChange={getuser}
                  />{" "}
                  Other
                </div>
              </div>

              <div className={signup.langbox}>
                Language Known
                <div id={signup.inputbox}>
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

              <div className={signup.degree}>
                Degree
                <div id={signup.inputbox}>
                  <input id={signup.text}
                    placeholder="Degree"
                    type="text"
                    name="degree"
                    value={user.degree}
                    onChange={getuser}
                  />
                </div>
              </div>

              <div className={signup.collage}>
                College Name
                <div id={signup.inputbox}>
                  <input id={signup.text}
                    placeholder="College Name"
                    type="text"
                    name="colname"
                    value={user.colname}
                    onChange={getuser}
                  />
                </div>
              </div>



              <h3>Work Experience : </h3>
              <div className={signup.post}>
                Post
                <div id={signup.inputbox}>
                  <input id={signup.text}
                    placeholder="Post"
                    type="text"
                    name="post"
                    value={user.post}
                    onChange={getuser}
                  />
                </div>
              </div>

              <div className={signup.company}>
                Company Name
                <div id={signup.inputbox}>
                  <input id={signup.text}
                    placeholder="Company Name"
                    type="text"
                    name="precompany"
                    value={user.precompany}
                    onChange={getuser}
                  />
                </div>
              </div>

              <div className={signup.duration}>
                Work Duration
                <div id={signup.inputbox}>
                  <input id={signup.text}
                    placeholder="Work Duration"
                    type="text"
                    name="preworkduration"
                    value={user.preworkduration}
                    onChange={getuser}
                  />
                </div>
              </div>

              <div className={signup.other}>
                Other detail
                <div id={signup.inputbox}>
                  <textarea id={signup.text}
                    placeholder=" Other detail"
                    cols="21"
                    rows="5"
                    name="otherdetail"
                    value={user.otherdetail}
                    onChange={getuser}
                  ></textarea>
                </div>
              </div>

              <div className={signup.skill}>
                Skill
                <div id={signup.inputbox}>
                  <input id={signup.text}
                    placeholder="Skill"
                    type="text"
                    name="skill"
                    onChange={skillchange} />
                  <button onClick={skillplus}>+</button>
                </div>
                {user.skill.map((name) => (
                  <p key={name}>{name}</p>
                ))}
              </div>

              <div className={signup.position}>
                Position
                <div id={signup.inputbox}>
                  <input
                    type="radio"
                    value="Admin"
                    name="position"
                    onChange={getuser}
                  />{" "}
                  Admin
                  <input
                    type="radio"
                    value="Manager"
                    name="position"
                    onChange={getuser}
                  />{" "}
                  Manager
                  <input
                    type="radio"
                    value="Employee"
                    name="position"
                    onChange={getuser}
                  />{" "}
                  Employee
                </div>
              </div>

              <div className={signup.password}>
                Password
                <div id={signup.inputbox}>
                  <input id={signup.text}
                    placeholder="Password"
                    type="password"
                    name="pass"
                    value={user.pass}
                    onChange={getuser}
                    autoComplete="on"
                  />
                </div>
              </div>

              <div className={signup.btn}>
                <button onClick={senduserdata}>Save</button>
                <input type="reset" value="Reset" />
              </div>
            </form>

          </div>
          <div className={signup.otherpart}>
          <img src={require(("@photos/Listical.png"))} alt="" />
            <h2>Listical</h2>
            <h1>Welcome Back!</h1>
            <div className={signup.login}>
              <Link className={signup.btn1} to={"/"} style={{ textDecoration: 'none' }}>Login page</Link>
            </div>
          </div>
        </div>
        <div className={signup.bgcolor}>
          <div className={signup.color}> 
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
