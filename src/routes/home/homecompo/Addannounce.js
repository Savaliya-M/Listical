import React from "react";

const Addannounce = (props) => {
  return (
    <>
      <div>
        <div>
          <div>
            <h1>ADD Announcement</h1>
            <button onClick={props.handleclose}>X</button>
          </div>

          <div>
            <div>
              <tr>
                <td>
                  <h3> Announcement Title : </h3>
                </td>
                <td>
                  <input type="text"></input>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <button>Submit</button> <button>Reset</button>
                </td>
              </tr>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addannounce;
