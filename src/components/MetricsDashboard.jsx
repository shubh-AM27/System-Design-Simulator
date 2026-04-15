import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function MetricsDashboard({ metrics }) {

  if (!metrics || metrics.length === 0) {
    return (
      <div style={{ width: "300px", padding: "20px", background: "#111827", color: "white" }}>
        Run simulation to see metrics
      </div>
    );
  }

  const data = {
    labels: metrics.map(m => m.name),
    datasets: [
      {
        label: "Server Load",
        data: metrics.map(m => m.load),
        backgroundColor: "rgba(59,130,246,0.7)"
      }
    ]
  };

  return (
    <div className="panel">
      <h3 style={{ color: "white" }}>System Metrics</h3>
      <Bar data={data} />
    </div>
  );
}

export default MetricsDashboard;