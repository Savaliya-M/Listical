import React from 'react';
import managercompo from './managercomp.module.scss';
import {Link} from 'react-router-dom';

const Managercompo = () => {
  return (
    <>
       <div className={managercompo.mainmanagercompo}>
       <div >
            <ul >
              <li >
                <div >H</div>
                <Link to="/">
                Manager
                </Link>
              </li>
              <li >
                <div>U</div>
                <Link to="user">
                Manager
                </Link>
              </li>
              <li >
                <div>P</div>
                <Link to="project">
                Manager
                </Link>
              </li>
            </ul>
          </div>     
       </div>
    </>
  )
}

export default Managercompo