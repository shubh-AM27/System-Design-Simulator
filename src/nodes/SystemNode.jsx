import React from "react";
import { Handle, Position } from "reactflow";

function SystemNode({ data }) {

  const getColor = () => {

  if (data.overloaded) {
    return "#ef4444";
  }

  switch (data.type) {

    case "Client":
      return "#38bdf8";

    case "LoadBalancer":
      return "#facc15";

    case "APIServer":
      return "#4ade80";

    case "Database":
      return "#fb7185";

    default:
      return "#94a3b8";
  }
  
};

  return (
    <div
    
      style={{
    padding: "12px",
    borderRadius: "12px",
    background: data.overloaded
        ? "linear-gradient(135deg, #ef4444, #b91c1c)"
        : "linear-gradient(135deg, #38bdf8, #6366f1)",
    color: "white",
    fontWeight: "500",
    boxShadow: data.overloaded
        ? "0px 0px 20px rgba(239,68,68,0.9), 0px 0px 40px rgba(239,68,68,0.6)"
        : "0px 6px 20px rgba(0,0,0,0.4)",
    animation: data.overloaded ? "pulse 1.5s infinite" : "none",
    transition: "all 0.25s ease"
    }}
    onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        }}

    onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        }}
      
    >

      <Handle type="target" position={Position.Top} />

      {data.label}
      {data.queue > 0 && (
      <div style={{ fontSize: "10px", marginTop: "4px" }}>
         Queue: {data.queue}
       </div>
)}
        {data.latency && (
        <div style={{ fontSize: "10px" }}>
          Latency: {data.latency} ms
         </div>
        )}

      {data.overloaded && (
  <div style={{ fontSize: "10px", marginTop: "4px" }}>
    ⚠ Overloaded
  </div>
)}

      <Handle type="source" position={Position.Bottom} />

    </div>
    
  );
}

export default SystemNode;