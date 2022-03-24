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
import Addholiday from "./homecompo/Addholiday";

const Home = () => {
  const [announcepopup, setAnnouncePopup] = useState(false);
  const [holidaypopup, setHolidayPopup] = useState(false);
  const [user, setUser] = useState([]);
  const [birthdateList, setBirthdateList] = useState([]);
  const [anniversaryList, setAnniversaryList] = useState([]);
  const [newHiresList, setNewHiresList] = useState([]);

  useEffect(() => {
    appRef.child("Users").on("value", (snapshot) => {
      setUser(snapshot.val());
    });

    appRef.child(`leave`).on("value", (snap) => {
      const rmleave = snap.val();
      if (rmleave) {
        Object.keys(rmleave).map((em) => {
          return Object.keys(rmleave[em]).map((uid) => {
            return Object.keys(rmleave[em][uid]).map((lid) => {
              const d = new Date();
              let tempExpiryDate = new Date(rmleave[em][uid][lid].rejectedDate);
              let templeaveEndD = new Date(rmleave[em][uid][lid].leaveEndD);
              tempExpiryDate.setDate(tempExpiryDate.getDate() + 7);
              if (templeaveEndD < d || tempExpiryDate < d) {
                appRef.child(`leave/${em}/${uid}/${lid}`).remove();
              }
              return lid;
            });
          });
        });
      }
    });
  }, []);

  useEffect(() => {
    const tempBirthdayList = Object.keys(user).map((id) => {
      const dateMonthObj = {
        month: new Date(user[id].dob).getMonth() + 1,
        day: new Date(user[id].dob).getDate(),
      };
      const newDate = {
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
      };
      if (
        dateMonthObj.month === newDate.month &&
        dateMonthObj.day === newDate.day
      ) {
        return { name: user[id].name, role: user[id].role, isBirthdate: true };
      } else {
        return { name: user[id], role: user[id].role, isBirthdate: false };
      }
    });
    let birthdayList = [];
    tempBirthdayList.forEach((elem) => {
      if (elem.isBirthdate) {
        birthdayList.push(elem);
      }
    });

    const newHires = Object.keys(user).map((id) => {
      function expiryCondition(hiredate) {
        let temphiredate = new Date(hiredate);
        temphiredate.setDate(temphiredate.getDate() + 7);
        let curDate = new Date();
        var H = curDate > temphiredate ? false : true;
        return { isHire: H ? true : false };
      }
      let exdate = expiryCondition(user[id].hiringdate);
      return { name: user[id].name, role: user[id].role, ...exdate };
    });
    let tempHiresList = [];
    newHires.forEach((elem) => {
      if (elem.isHire) {
        tempHiresList.push(elem);
      }
    });

    const tempAnniversaryList = Object.keys(user).map((id) => {
      function getDateDiff(dateString) {
        let currentDate = new Date();
        let joinDate = new Date(dateString);
        var age = currentDate.getFullYear() - joinDate.getFullYear();
        var m = currentDate.getMonth() - joinDate.getMonth();
        var d = currentDate.getDate() - joinDate.getDate();
        if (m < 0 || (m === 0 && currentDate.getDate() < joinDate.getDate())) {
          age--;
        }

        return {
          yearsOfJoined: age,
          isAnniversary: d === 0 && age !== 0 ? true : false,
        };
      }
      let yearCount = getDateDiff(user[id].hiringdate);
      return { name: user[id].name, role: user[id].role, ...yearCount };
    });
    let anniversaryList = [];
    tempAnniversaryList.forEach((elem) => {
      if (elem.isAnniversary) {
        anniversaryList.push(elem);
      }
    });

    setBirthdateList(birthdayList);
    setAnniversaryList(anniversaryList);
    setNewHiresList(tempHiresList);
  }, [user]);

  const announce = () => {
    setAnnouncePopup(!announcepopup);
  };

  const holiday = () => {
    setHolidayPopup(!holidaypopup);
  };
  return (
    <>
      <div className={home.mainhome}>
        <Announcements handleopen={announce} />
        <Birthday birthdayList={birthdateList} />
        <Newhires newHires={newHiresList} />
        <Todaysleave />
        <Workanniversary anniversaryList={anniversaryList} />
        <Upcomingholidays handleopen={holiday} />
        {announcepopup && <Addannounce handleclose={announce} />}
        {holidaypopup && <Addholiday handleclose={holiday} />}
      </div>
    </>
  );
};

export default Home;
