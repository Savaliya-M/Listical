import React, { useState, useEffect } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);
const Charttemp = ({ project }) => {
  const [chartData1, setChartData1] = useState("");
  // console.log(tasklist);
  useEffect(() => {
    let tempCompleted = [];
    let tempProgress = [];
    let tempPanding = [];
    if (project.TaskList && project.TaskList.length !== 0) {
      tempCompleted = Object.values(project.TaskList).filter((tid) => {
        if (tid.status === "Complete") {
          console.log("tid", tid.status);
          return true;
        }
      });
      tempProgress = Object.values(project.TaskList).filter((tid) => {
        if (tid.status === true) {
          console.log("tid", tid.status);
          return true;
        }
      });
      tempPanding = Object.values(project.TaskList).filter((tid) => {
        if (tid.status === false) {
          console.log("tid", tid.status);
          return true;
        }
      });
      console.log(tempCompleted);
      console.log(tempPanding);
      console.log(tempProgress);
    }
    if (project.TaskList && project.TaskList.length !== 0) {
      const pieData1 = {
        labels: ["Completed", "Progress", "Panding"],
        datasets: [
          {
            label: "chart1",
            labels: ["Completed", "Progress", "Panding"],
            data: [
              tempCompleted.length,
              tempProgress.length,
              tempPanding.length,
            ],
            backgroundColor: ["green", "yellow", "red"],
          },
        ],
      };
      setChartData1(pieData1);
    } else {
      const pieData1 = {
        labels: ["No Task Added"],
        datasets: [
          {
            label: "chart1",
            labels: ["No Task Added"],
            data: [1],
            backgroundColor: ["gray"],
          },
        ],
      };
      setChartData1(pieData1);
      // console.log("fffff");
    }
  }, [project]);
  return <div>{chartData1 !== "" ? <Doughnut data={chartData1} /> : null}</div>;
};

export default Charttemp;
