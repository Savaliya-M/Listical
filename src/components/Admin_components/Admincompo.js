import React from "react";
import { Link } from "react-router-dom";
// import Home from "@home/Home";
// import User from "@user/User";
// import Project from "@projects/Project";
import admincompo from "./admincompo.module.scss";

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
      <div className={admincompo.maindivsidebar}>
        <div className={admincompo.sidebar}>
          <ul className={admincompo.sidebarlist}>
            <li className={admincompo.rows}>
              <div className={admincompo.icone}>H</div>
              <Link className={admincompo.title} to="/">
                Home
              </Link>
            </li>
            <li className={admincompo.rows}>
              <div className={admincompo.icone}>U</div>
              <Link className={admincompo.title} to="user">
                User
              </Link>
            </li>
            <li className={admincompo.rows}>
              <div className={admincompo.icone}>P</div>
              <Link className={admincompo.title} to="project">
                Project
              </Link>
            </li>
            <li className={admincompo.rows}>
              <div className={admincompo.icone}>A</div>
              <Link className={admincompo.title} to="approvals">
                Approvals
              </Link>
            </li>
          </ul>
        </div>
        {/* <div className={admincompo.pages}>
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
