import React from "react";
import "./addprojectpopup.css";

const Addprojectpopup = (props) => {
 
  return (
    <>
    <div className="mainpropopup" >
      <div className="pro-add">
        <div className="formhead">
          <h1>ADD PROJECT</h1>
          <button onClick={props.handleclose}>X</button>
        </div>

        <div className="fields">
          {/* <form action=""> */}
          <div>
            <tr>
              <td>
                <h3> Project Title : </h3>
              </td>
              <td>
                <input type="text" className="fieldsinput"></input>
              </td>
            </tr>
            <tr>
              <td>
                <h3> Client Name : </h3>
              </td>
              <td>
                <input type="text" className="fieldsinput"></input>
              </td>
            </tr>
            <tr>
              <td>
                <h3>Time Line : </h3>
              </td>
              <td>
                <input type="text" className="fieldsinput"></input>
              </td>
            </tr>
            <tr>
              <td>
                <h3>Techonolgy : </h3>
              </td>
              <td>
                <input type="text" className="fieldsinput"></input>
              </td>
            </tr>
            <tr>
              <td>
                <h3>Manager Name : </h3>
              </td>
              <td>
                <input type="text" className="fieldsinput"></input>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button className="fieldsbtn" >Submit</button> <button className="fieldsbtn">Reset</button>
              </td>
            </tr>
          {/* </form> */}</div>
        </div>
      </div>
      </div>
    </>);
 
};

export default Addprojectpopup;
