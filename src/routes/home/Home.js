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

  useEffect(() => {
    appRef.child("Users").on("value", (snapshot) => {
      let bd = [];
      Object.values(snapshot.val()).map((elem) => {
        bd.push(elem.dob);
      });
      setDob(bd);
    });
  }, []);

  useEffect(() => {
    console.log(dob);

    let dateObj = dob.map((elem) => {
      // date.push(elem.dob);
      console.log(elem);
      return new Date(elem).getMonth() + 1, new Date(elem).getDate();
    });
    console.log(dateObj);
  }, [dob]);

  // const d = new Date(dob);
  // console.log(d);
  // console.log(d.getDate());
  // console.log(d.getMonth() + 1);
  // const cd = new Date();
  // console.log(cd);
  // console.log(cd.getDate());
  // console.log(cd.getMonth() + 1);

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
