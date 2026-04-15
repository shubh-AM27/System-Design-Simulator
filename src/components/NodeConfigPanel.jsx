import React from "react";

function NodeConfigPanel({ selectedNode, updateNode }) {

  if (!selectedNode) {
    return (
      <div style={{ width: "250px", padding: "20px", background: "#0f172a", color: "white" }}>
        Select a node
      </div>
    );
  }

  const handleChange = (field, value) => {
    updateNode(selectedNode.id, field, value);
  };

  return (
    <div style={{ width: "250px", padding: "20px", background: "#0f172a", color: "white" }}>

      <h3>{selectedNode.data.label}</h3>

      <label>Capacity</label>
      <input
       type="number"
       value={selectedNode.data.capacity || ""}
       onChange={(e) => updateNode(selectedNode.id, "capacity", e.target.value)}
      />

      <br /><br />

      <label>Latency (ms)</label>
      <input
       type="number"
       value={selectedNode.data.latency || ""}
       onChange={(e) => updateNode(selectedNode.id, "latency", e.target.value)}
      />

    </div>
  );
}

export default NodeConfigPanel;