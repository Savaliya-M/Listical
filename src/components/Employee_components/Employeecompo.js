import React from 'react';
import {Link} from 'react-router-dom';


const Employeecompo = () => {
  return (
    <>
        <div className="maindivsidebar">
         <div className="sidebar">
           <ul className="sidebarlist">
             <li className="rows">
               <div className="icone">H</div>
               <Link className="title" to="/layout">
                 Employee
               </Link>
             </li>
             <li className="rows">
               <div className="icone">U</div>
               <Link className="title" to="manager">
               Employee
               </Link>
             </li>
             <li className="rows">
               <div className="icone">P</div>
               <Link className="title" to="project">
               Employee
               </Link>
             </li>
           </ul>
         </div>
       </div>
    </>
  )
}

export default Employeecompo