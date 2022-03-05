import React, { useEffect } from "react";
import home from "./home.module.scss";
import Announcements from "@homecompo/Announcements";
import Birthday from "@homecompo/Birthday";
import Newhires from "@homecompo/Newhires";
import Todaysleave from "@homecompo/Todaysleave";
import Upcomingholidays from "@homecompo/Upcomingholidays";
import Workanniversary from "@homecompo/Workanniversary";

const Home = () => {
  // useEffect(() => {
  //     appRef.child("Users").on("value", (snapshot) => {
  //       const userData = snapshot.val();
  //       Object.values(userData).forEach((elem) => {
  //         // if (elem.dob ==) {
  //         //   setUser(elem);
  //         // }
  //       });
  //     });
  //   }, []);
  //   const d = date(10 - 08 - 2002);
  const d = new Date();
  console.log(d);
  console.log(d.getDate());
  console.log(d.getMonth() + 1);
  return (
    <>
      <div className={home.mainhome}>
        <Announcements />
        <Birthday />
        <Newhires />
        <Todaysleave />
        <Workanniversary />
        <Upcomingholidays />
      </div>
    </>
  );
};

export default Home;
