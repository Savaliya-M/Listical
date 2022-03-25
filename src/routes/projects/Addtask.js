import React, { useState, useEffect } from "react";
import appRef from "../../firebase";

const Addtask = ({ pid, pdetail, users, handleclose }) => {
  const [taskDetail, setTaskDetail] = useState({
    taskName: "",
    empId: "",
    priority: "",
    status: false,
    astimatedTime: "",
  });
  const [proDetail, setProDetail] = useState(pdetail);
  const [user, setUser] = useState(users);
  const [empDropdown, setEmpDropdown] = useState([]);
  // -----------------------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    let tempempDropdown = [];
    Object.keys(user).map((uid) => {
      Object.keys(proDetail.empids).map((eid) => {
        if (proDetail.empids && proDetail.empids[eid] === user[uid].uuid) {
          tempempDropdown.push({
            empId: user[uid].uuid,
            empName: user[uid].name,
          });
        }
      });
    });
    setEmpDropdown(tempempDropdown);
  }, [user, proDetail]);

  // -----------------------------------------------------------------------------------------------------------------------------------
  const taskchange = (e) => {
    setTaskDetail({ ...taskDetail, [e.target.name]: e.target.value });
  };
  const taskClick = () => {
    appRef.child(`Projects/${pid}/TaskList`).push(taskDetail, () => {
      setTaskDetail({
        taskName: "",
        empId: "",
        priority: "",
        status: false,
        astimatedTime: "",
      });
    });
  };
  // -----------------------------------------------------------------------------------------------------------------------------------
  return (
    <>
      <div>
        <button onClick={handleclose}>X</button>
        <div>
          task name
          <input
            type="text"
            value={taskDetail.taskName}
            name="taskName"
            onChange={taskchange}
          />
        </div>
        <div>
          employee Name
          <select value={taskDetail.empId} name="empId" onChange={taskchange}>
            <option value="---Select Employee---">---Select Employee---</option>
            {Object.values(empDropdown).map((eid) => (
              <option key={eid.empId} value={eid.empId}>
                {eid.empName}
              </option>
            ))}
          </select>
        </div>
        <div>
          Status Priority
          <input
            type="radio"
            value="High"
            name="priority"
            onChange={taskchange}
          />
          High
          <input
            type="radio"
            value="Medium"
            name="priority"
            onChange={taskchange}
          />
          Medium
          <input
            type="radio"
            value="Low"
            name="priority"
            onChange={taskchange}
          />
          Low
        </div>
        <div>
          Astimated Time In Hours
          <input
            type="text"
            value={taskDetail.astimatedTime}
            name="astimatedTime"
            onChange={taskchange}
          />
        </div>
        <div>
          <button onClick={taskClick}>Save</button>
        </div>
      </div>
    </>
  );
};

export default Addtask;
