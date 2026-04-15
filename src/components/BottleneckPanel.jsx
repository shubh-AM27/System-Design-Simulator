import React from "react";

function BottleneckPanel({ metrics }) {

  if (!metrics || metrics.length === 0) {
    return (
      <div className="panel">
        Run simulation to detect issues
      </div>
    );
  }

  const alerts = [];

  metrics.forEach(node => {

    if (node.overloaded) {
      alerts.push(`⚠ ${node.name} overloaded`);
    }

    if (node.queue > 100) {
      alerts.push(`⚠ ${node.name} queue buildup`);
    }

    if (node.latency > 200) {
      alerts.push(`⚠ ${node.name} high latency`);
    }

  });

  return (
    <div className="panel">
      <h3>System Alerts</h3>

      {alerts.length === 0 ? (
        <div>✅ System Healthy</div>
      ) : (
        alerts.map((alert, index) => (
          <div key={index} style={{ marginTop: "5px", color: "#f87171" }}>
            {alert}
          </div>
        ))
      )}

    </div>
  );
}

export default BottleneckPanel;