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

              <Link className={admincompo.title} to="/">
                <div className={admincompo.icone}>
                  <img src={require('@photos/house.png')} />
                </div>
                Home
              </Link>


            </li>
            <li className={admincompo.rows}>
              <Link className={admincompo.title} to="user">
                <div className={admincompo.icone}>
                  <img src={require('@photos/people.png')} alt="People" />
                </div>

                User
              </Link>
            </li>
            <li className={admincompo.rows}>
              <Link className={admincompo.title} to="project">
                <div className={admincompo.icone}>
                  <img src={require('@photos/project.png')} alt="" />
                </div>
                Project
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
