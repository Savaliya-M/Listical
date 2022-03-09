import React from "react";
import annocuncements from "./homecompo.module.scss";
import appRef from "../../../firebase";

const Announcements = (props) => {
  return (
    <>
      <div className={annocuncements.mainhomecompo} id={annocuncements.announcements} >
        <div className={annocuncements.head} id={annocuncements.announcements}>
          <h3>Announcements</h3>
          <button onClick={props.handleopen}>+</button>
        </div>
        <div className={annocuncements.mainContent}>
          <div
            className={annocuncements.content}
            id={annocuncements.announcement}
          >
            <div className={annocuncements.cimg}>
              <p>img</p>
            </div>
            <div className={annocuncements.text}>
              <h3>Meeting</h3>
              <p>text</p>
            </div>
          </div>

          <div
            className={annocuncements.content}
            id={annocuncements.announcement}
          >
            <div className={annocuncements.cimg}>
              <p>img</p>
            </div>
            <div className={annocuncements.text}>
              <h3>Meeting</h3>
              <p>text</p>
            </div>
          </div>
          <div
            className={annocuncements.content}
            id={annocuncements.announcement}
          >
            <div className={annocuncements.cimg}>
              <p>img</p>
            </div>
            <div className={annocuncements.text}>
              <h3>Meeting</h3>
              <p>text</p>
            </div>
          </div>
          <div
            className={annocuncements.content}
            id={annocuncements.announcement}
          >
            <div className={annocuncements.cimg}>
              <p>img</p>
            </div>
            <div className={annocuncements.text}>
              <h3>Meeting</h3>
              <p>text</p>
            </div>
          </div>
          <div
            className={annocuncements.content}
            id={annocuncements.announcement}
          >
            <div className={annocuncements.cimg}>
              <p>img</p>
            </div>
            <div className={annocuncements.text}>
              <h3>Meeting</h3>
              <p>text</p>
            </div>
          </div>
          <div
            className={annocuncements.content}
            id={annocuncements.announcement}
          >
            <div className={annocuncements.cimg}>
              <p>img</p>
            </div>
            <div className={annocuncements.text}>
              <h3>Meeting</h3>
              <p>text</p>
            </div>
          </div>
          <div
            className={annocuncements.content}
            id={annocuncements.announcement}
          >
            <div className={annocuncements.cimg}>
              <p>img</p>
            </div>
            <div className={annocuncements.text}>
              <h3>Meeting</h3>
              <p>text</p>
            </div>
          </div>
          <div
            className={annocuncements.content}
            id={annocuncements.announcement}
          >
            <div className={annocuncements.cimg}>
              <p>img</p>
            </div>
            <div className={annocuncements.text}>
              <h3>Meeting</h3>
              <p>text</p>
            </div>
          </div>
          <div
            className={annocuncements.content}
            id={annocuncements.announcement}
          >
            <div className={annocuncements.cimg}>
              <p>img</p>
            </div>
            <div className={annocuncements.text}>
              <h3>Meeting</h3>
              <p>text</p>
            </div>
          </div>
          <div
            className={annocuncements.content}
            id={annocuncements.announcement}
          >
            <div className={annocuncements.cimg}>
              <p>img</p>
            </div>
            <div className={annocuncements.text}>
              <h3>Meeting</h3>
              <p>text</p>
            </div>
          </div>
          <div
            className={annocuncements.content}
            id={annocuncements.announcement}
          >
            <div className={annocuncements.cimg}>
              <p>img</p>
            </div>
            <div className={annocuncements.text}>
              <h3>Meeting</h3>
              <p>text</p>
            </div>
          </div>
          <div
            className={annocuncements.content}
            id={annocuncements.announcement}
          >
            <div className={annocuncements.cimg}>
              <p>img</p>
            </div>
            <div className={annocuncements.text}>
              <h3>Meeting</h3>
              <p>text</p>
            </div>
          </div>
          <div
            className={annocuncements.content}
            id={annocuncements.announcement}
          >
            <div className={annocuncements.cimg}>
              <p>img</p>
            </div>
            <div className={annocuncements.text}>
              <h3>Meeting</h3>
              <p>text</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Announcements;
