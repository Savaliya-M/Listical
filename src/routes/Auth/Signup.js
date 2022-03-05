import React, { useState } from "react";
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
    console.log(user);
    navigate("/");
  };

  return (
    <>
      <div className="mainsignup">
        <div className="signupform">
          <h1> Sign-Up</h1>
          <form action="#">
            <div>
              Full name :
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={getuser}
              />
            </div>
            <div>
              Mail-id :
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={getuser}
              />
            </div>
            <div>
              Mobile No. :
              <input
                type="text"
                name="mono"
                value={user.mono}
                onChange={getuser}
              />
            </div>
            <div>
              Address :
              <textarea
                name="address"
                value={user.address}
                onChange={getuser}
                cols="21"
                rows="2"
              ></textarea>
            </div>
            <div>
              DOB :
              <input
                type="date"
                name="dob"
                value={user.dob}
                onChange={getuser}
              />
            </div>
            <div>
              Gender :
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
            <div className="lang-checkbox">
              Language Known :
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
            <div>
              Degree :
              <input
                type="text"
                name="degree"
                value={user.degree}
                onChange={getuser}
              />
            </div>
            <div>
              College Name :
              <input
                type="text"
                name="colname"
                value={user.colname}
                onChange={getuser}
              />
            </div>

            <h3>Work Experience : </h3>
            <div>
              Post :
              <input
                type="text"
                name="post"
                value={user.post}
                onChange={getuser}
              />
            </div>
            <div>
              Prev. Company Name :
              <input
                type="text"
                name="precompany"
                value={user.precompany}
                onChange={getuser}
              />
            </div>
            <div>
              Work Duration of Prev. Company :
              <input
                type="text"
                name="preworkduration"
                value={user.preworkduration}
                onChange={getuser}
              />
            </div>
            <div>
              Other detail
              <textarea
                cols="21"
                rows="5"
                name="otherdetail"
                value={user.otherdetail}
                onChange={getuser}
              ></textarea>
            </div>
            <div>
              Skill :
              <input type="text" name="skill" onChange={skillchange} />
              <button onClick={skillplus}>+</button>
            </div>
            {user.skill.map((name) => (
              <p key={name}>{name}</p>
            ))}
            <div>
              Position :
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
            <div>
              Password :
              <input
                type="password"
                name="pass"
                value={user.pass}
                onChange={getuser}
                autoComplete="on"
              />
            </div>
            <div>
              <button onClick={senduserdata}>Save</button>
              <input type="Reset" />
            </div>
          </form>
          <Link to={"/"}>Login page</Link>
        </div>
      </div>
    </>
  );
};

export default Signup;
