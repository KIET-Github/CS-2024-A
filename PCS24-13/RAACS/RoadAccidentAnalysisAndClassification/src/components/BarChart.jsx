import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Year vs Severity",
    },
  },
  scales: {
    x: {
      beginAtZero: true,
    },
    y: {
      beginAtZero: true,
      max: 3,
    },
  },
};

const years = [2016, 2017, 2018, 2019, 2020, 2021, 2022];

export function BarChart() {
  const [chartData, setChartData] = useState({
    labels: years,
    datasets: [
      {
        label: "Severity Level",
        data: [],
        backgroundColor: "#42A5F5",
        borderColor: "#42A5F5",
        borderWidth: 1,
      },
    ],
  });

  const severityData = Array.from(
    { length: years.length },
    () => Math.floor(Math.random() * 3) + 1
  );
  useEffect(() => {
    setChartData((prevChartData) => ({
      ...prevChartData,
      datasets: [
        {
          ...prevChartData.datasets[0],
          data: severityData,
        },
      ],
    }));
  }, []);

  return <Bar options={options} data={chartData} />;
}
