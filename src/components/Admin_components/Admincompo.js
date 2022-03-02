import React from "react";
import {Link} from "react-router-dom";
// import Home from "@home/Home";
// import User from "@user/User";
// import Project from "@projects/Project";
import "./admincompo.css";


const Admincompo = () => {
  // const {state} = useLocation();
  // const {user} = state;
  // const [loguser, setLoguser] = useState({});
  // useEffect(() => {
  //   setLoguser(user);
  // }, [])
  
 
  // console.log(loguser);
  return (
    <>
        <div className="maindivsidebar">
         
          <div className="sidebar">
            <ul className="sidebarlist">
              <li className="rows">
                <div className="icone">H</div>
                <Link className="title" to="/">
                  Home
                </Link>
              </li>
              <li className="rows">
                <div className="icone">U</div>
                <Link className="title" to="user">
                  User
                </Link>
              </li>
              <li className="rows">
                <div className="icone">P</div>
                <Link className="title" to="project">
                  Project
                </Link>
              </li>
            </ul>
          </div>
          {/* <div className="pages">
            <Routes>
              <Route  path="/" element={<Home />} />
              <Route exact path="user/*" element={<User />} />
              <Route exact path="project" element={<Project />} />
            </Routes>
          </div> */}
        </div>
    </>
  );
};

export default Admincompo;
