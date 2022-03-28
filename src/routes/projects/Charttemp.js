import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);
const Charttemp = () => {
  const pieData = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["rgba(255,0,0, 1)", "#36A2EB", "#FFCE56"],
      },
    ],
  };
  return (
    <div>
      <Doughnut data={pieData} />
    </div>
  );
};

export default Charttemp;
