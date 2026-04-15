import React, { useState } from "react";

function SimulationPanel({ runSimulation }) {

  const [traffic, setTraffic] = useState(100);

  const handleStart = () => {
    runSimulation(traffic);
  };

  return (
    <div className="panel">

      <h3>Simulation</h3>

      <label>Requests / sec</label>

      <input
        type="number"
        value={traffic}
        onChange={(e) => setTraffic(Number(e.target.value))}
      />

      <br /><br />

      <button onClick={handleStart}>
        Start Simulation
      </button>

    </div>
  );
}

export default SimulationPanel;