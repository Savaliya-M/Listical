import React from "react";
import apps from "./app.module.scss";
import Layout from "./components/Layout/Layout";
import Login from "@routes/Auth/Login";
import Signup from "@routes/Auth/Signup";
import {Routes, Route} from "react-router-dom";
import Main from "./Main";

function App() {
  return (
    <>
      <div className={apps.appmain}>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/Signup" element={<Signup />} />
          <Route exact path="/layout/*" element={<Layout/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
