import React, { useEffect, useState } from "react";
import home from "./home.module.scss";
import Announcements from "@homecompo/Announcements";
import Birthday from "@homecompo/Birthday";
import Newhires from "@homecompo/Newhires";
import Todaysleave from "@homecompo/Todaysleave";
import Upcomingholidays from "@homecompo/Upcomingholidays";
import Workanniversary from "@homecompo/Workanniversary";
import appRef from "../../firebase";
import Addannounce from "./homecompo/Addannounce";

const Home = () => {
  const [popup, setPopup] = useState(false);
  const [dob, setDob] = useState([]);
  const [isBirthdate, setIsBirthdate] = useState({ name: "", bbb: false });
  const [todaybirth, setTodaybirth] = useState([]);

  useEffect(() => {
    appRef.child("Users").on("value", (snapshot) => {
      setDob(snapshot.val());
    });
  }, []);

  useEffect(() => {
    const mainArr = Object.keys(dob).map((id) => {
      const dateMonthObj = {
        month: new Date(dob[id].dob).getMonth() + 1,
        day: new Date(dob[id].dob).getDate(),
      };
      const newDate = {
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
      };
      if (
        dateMonthObj.month === newDate.month &&
        dateMonthObj.day === newDate.day
      ) {
        return { name: dob[id].name, bbb: true };
      } else {
        return { name: dob[id].name, bbb: false };
      }
    });

    setIsBirthdate(mainArr);
  }, [dob]);

  // useEffect(() => {
  //   console.log(dob);
  //   // const d = new Date();
  //   const tempArr1 = Object.values(dob).forEach((elem) => {
  //     const tempArr = [];

  //     const dateMonthObj = {
  //       month: new Date(elem.dob).getMonth() + 1,
  //       day: new Date(elem.dob).getDate(),
  //     };
  //     const newDate = {
  //       month: new Date().getMonth() + 1,
  //       day: new Date().getDate(),
  //     };
  //     // setIsBirthdate({ ...isBirthdate, name: "mitul" });
  //     console.log("elem", elem);
  //     if (
  //       dateMonthObj.month === newDate.month &&
  //       dateMonthObj.day === newDate.day
  //     ) {
  //       tempArr.push({ name: "mitul" });
  //       // const tempObj = { name: elem.name, bbb: true };
  //     } else {
  //       // setIsBirthdate({ ...isBirthdate, name: "mitul" });
  //       tempArr.push({ name: "mitul" });
  //     }
  //     console.log("arr", tempArr);
  //     return tempArr;
  //   });
  //   setIsBirthdate(tempArr1);
  // }, []);

  // useEffect(() => {

  // }, [dob]);

  // useEffect(() => {
  //   console.log(isBirthdate);
  //   if (isBirthdate) {
  //     isBirthdate.map((id) => {
  //       // let today = [{}];
  //       // if (isBirthdate[id] === true) {
  //       //   // setTodaybirth(isBirthdate[id].name);
  //       //   today.push(isBirthdate[id]);
  //       // }
  //       // console.log(isBirthdate[id]);
  //     });
  //   }
  // }, [isBirthdate]);

  useEffect(() => {
    console.log(isBirthdate);
  }, [isBirthdate]);

  const announce = () => {
    setPopup(!popup);
  };
  return (
    <>
      <div className={home.mainhome}>
        <Announcements handleopen={announce} />
        <Birthday />
        <Newhires />
        <Todaysleave />
        <Workanniversary />
        <Upcomingholidays />
        {popup && <Addannounce handleclose={announce} />}
      </div>
    </>
  );
};

export default Home;
