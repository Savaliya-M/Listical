import React from "react";
import addpropop from "./addprojectpopup.module.scss";

const Addprojectpopup = (props) => {
 
  return (
    <>
    <div className={addpropop.mainpropopup} >
      <div className={addpropop.proadd}>
        <div className={addpropop.formhead}>
          <h1>ADD PROJECT</h1>
          <button onClick={props.handleclose}>X</button>
        </div>

        <div className={addpropop.fields}>
          {/* <form action=""> */}
          <div>
            <tr>
              <td>
                <h3> Project Title : </h3>
              </td>
              <td>
                <input type="text" className={addpropop.fieldsinput}></input>
              </td>
            </tr>
            <tr>
              <td>
                <h3> Client Name : </h3>
              </td>
              <td>
                <input type="text" className={addpropop.fieldsinput}></input>
              </td>
            </tr>
            <tr>
              <td>
                <h3>Time Line : </h3>
              </td>
              <td>
                <input type="text" className={addpropop.fieldsinput}></input>
              </td>
            </tr>
            <tr>
              <td>
                <h3>Techonolgy : </h3>
              </td>
              <td>
                <input type="text" className={addpropop.fieldsinput}></input>
              </td>
            </tr>
            <tr>
              <td>
                <h3>Manager Name : </h3>
              </td>
              <td>
                <input type="text" className={addpropop.fieldsinput}></input>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button className={addpropop.fieldsbtn} >Submit</button> <button className={addpropop.fieldsbtn}>Reset</button>
              </td>
            </tr>
          {/* </form> */}</div>
        </div>
      </div>
      </div>
    </>);
 
};

export default Addprojectpopup;
