import React from "react";
import {useNavigate} from "react-router-dom";
import "./usercompo.css";

const Usercompo = () => {
let navigate = useNavigate();
// const [users, setUsers] = useState({})
// console.log(users);
// const {name, mono, post} = user;
const uinfo = () => {};
  return (
    <>
      <div className="mainusercompo">
        <div className="person" >
          <div className="left">
              <h1>LOGO</h1>
              <button>Del</button>
              <button>Dis</button>
          </div>
          <div className="right" onClick={()=>{navigate('info')}}>
              <h2>mitulkumar</h2>
              <h5>8469494654685</h5>
              <p>devloper</p>
          </div>
        </div>
         <div className="person" >
          <div className="left">
              <h1>LOGO</h1>
              <button>Del</button>
              <button>Dis</button>
          </div>
          <div className="right" onClick={uinfo}>
              <h2>Mitulkumar</h2>
              <h5>9865327845</h5>
              <p>Head of the department for this is start</p>
          </div>
        </div>
        <div className="person" > 
          <div className="left">
              <h1>LOGO</h1>
              <button>Del</button>
              <button>Dis</button>
          </div>
          <div className="right" onClick={uinfo}>
              <h2>Mitulkumar</h2>
              <h5>9865327845</h5>
              <p>Head of the department for this is start</p>
          </div>
        </div>
        <div className="person" >
          <div className="left">
              <h1>LOGO</h1>
              <button>Del</button>
              <button>Dis</button>
          </div>
          <div className="right" onClick={uinfo}>
              <h2>Mitulkumar</h2>
              <h5>9865327845</h5>
              <p>Head of the department for this is start</p>
          </div>
        </div>
        {/*<div className="person" >
          <div className="left">
              <h1>LOGO</h1>
              <button>Del</button>
              <button>Dis</button>
          </div>
          <div className="right" onClick={uinfo}>
              <h2>Mitulkumar</h2>
              <h5>9865327845</h5>
              <p>Head of the department for this is start</p>
          </div>
        </div>
        <div className="person" >
          <div className="left">
              <h1>LOGO</h1>
              <button>Del</button>
              <button>Dis</button>
          </div>
          <div className="right" onClick={uinfo}>
              <h2>Mitulkumar</h2>
              <h5>9865327845</h5>
              <p>Head of the department for this is start</p>
          </div>
        </div>
        <div className="person" >
          <div className="left">
              <h1>LOGO</h1>
              <button>Del</button>
              <button>Dis</button>
          </div>
          <div className="right" onClick={uinfo}>
              <h2>Mitulkumar</h2>
              <h5>9865327845</h5>
              <p>Head of the department for this is start</p>
          </div>
        </div>
        <div className="person" >
          <div className="left">
              <h1>LOGO</h1>
              <button>Del</button>
              <button>Dis</button>
          </div>
          <div className="right" onClick={uinfo}>
              <h2>Mitulkumar</h2>
              <h5>9865327845</h5>
              <p>Head of the department for this is start</p>
          </div>
        </div>
        <div className="person" >
          <div className="left">
              <h1>LOGO</h1>
              <button>Del</button>
              <button>Dis</button>
          </div>
          <div className="right" onClick={uinfo}>
              <h2>Mitulkumar</h2>
              <h5>9865327845</h5>
              <p>Head of the department for this is start</p>
          </div>
        </div>
        <div className="person" >
          <div className="left">
              <h1>LOGO</h1>
              <button>Del</button>
              <button>Dis</button>
          </div>
          <div className="right" onClick={uinfo}>
              <h2>Mitulkumar</h2>
              <h5>9865327845</h5>
              <p>Head of the department for this is start</p>
          </div>
        </div>
        <div className="person" >
          <div className="left">
              <h1>LOGO</h1>
              <button>Del</button>
              <button>Dis</button>
          </div>
          <div className="right" onClick={uinfo}>
              <h2>Mitulkumar</h2>
              <h5>9865327845</h5>
              <p>Head of the department for this is start</p>
          </div>
        </div>
        <div className="person" >
          <div className="left">
              <h1>LOGO</h1>
              <button>Del</button>
              <button>Dis</button>
          </div>
          <div className="right" onClick={uinfo}>
              <h2>Mitulkumar</h2>
              <h5>9865327845</h5>
              <p>Head of the department for this is start</p>
          </div>
        </div>
        <div className="person" >
          <div className="left">
              <h1>LOGO</h1>
              <button>Del</button>
              <button>Dis</button>
          </div>
          <div className="right" onClick={uinfo}>
              <h2>Mitulkumar</h2>
              <h5>9865327845</h5>
              <p>Head of the department for this is start</p>
          </div>
        </div>
        <div className="person" >
          <div className="left">
              <h1>LOGO</h1>
              <button>Del</button>
              <button>Dis</button>
          </div>
          <div className="right" onClick={uinfo}>
              <h2>Mitulkumar</h2>
              <h5>9865327845</h5>
              <p>Head of the department for this is start</p>
          </div>
        </div>
        <div className="person" >
          <div className="left">
              <h1>LOGO</h1>
              <button>Del</button>
              <button>Dis</button>
          </div>
          <div className="right" onClick={uinfo}>
              <h2>Mitulkumar</h2>
              <h5>9865327845</h5>
              <p>Head of the department for this is start</p>
          </div>
        </div>
        <div className="person" >
          <div className="left">
              <h1>LOGO</h1>
              <button>Del</button>
              <button>Dis</button>
          </div>
          <div className="right" onClick={uinfo}>
              <h2>Mitulkumar</h2>
              <h5>9865327845</h5>
              <p>Head of the department for this is start</p>
          </div>
        </div>
        <div className="person" >
          <div className="left">
              <h1>LOGO</h1>
              <button>Del</button>
              <button>Dis</button>
          </div>
          <div className="right" onClick={uinfo}>
              <h2>Mitulkumar</h2>
              <h5>9865327845</h5>
              <p>Head of the department for this is start</p>
          </div>
        </div> */}
        
      </div>
    </>
  );
};

export default Usercompo;
