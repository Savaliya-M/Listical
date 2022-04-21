import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [user, setUser] = useState({
    uuid: "",
    type: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    setUser({
      uuid: localStorage.getItem("email"),
      type: localStorage.getItem("Type"),
    });
  }, []);
  if (
    user.type === "Admin" ||
    user.type === "Manager" ||
    user.type === "Employee"
  ) {
    navigate("/layout/");
  } else {
    navigate("/login");
  }
  return <>Loading</>;
};

export default Main;
