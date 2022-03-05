import React from 'react';
import {Link} from 'react-router-dom';
import emplocompo from "./employecompo.module.scss";


const Employeecompo = () => {
  return (
    <>
       <div className={emplocompo.maindivsidebar}>
         
         <div className={emplocompo.sidebar}>
           <ul className={emplocompo.sidebarlist}>
             <li className={emplocompo.rows}>
               <div className={emplocompo.icone}><img src={require('@photos/house.png')}/></div>
               <Link className={emplocompo.title} to="/">
                 Home
               </Link>
             </li>
             <li className={emplocompo.rows}>
               <div className={emplocompo.icone}><img src={require('@photos/people.png')} alt="People" /></div>
               <Link className={emplocompo.title} to="user">
                 User
               </Link>
             </li>
             <li className={emplocompo.rows}>
               <div className={emplocompo.icone}><img src={require('@photos/project.png')} alt="" /></div>
               <Link className={emplocompo.title} to="project">
                 Project
               </Link>
             </li>
           </ul>
         </div>
         {/* <div className={emplocompo.pages}>
           <Routes>
             <Route  path="/" element={<Home />} />
             <Route exact path="user/*" element={<User />} />
             <Route exact path="project" element={<Project />} />
           </Routes>
         </div> */}
       </div>
    </>
  )
}

export default Employeecompo