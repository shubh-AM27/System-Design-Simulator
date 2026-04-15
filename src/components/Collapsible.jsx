import React, { useState } from "react";

function Collapsible({ title, children }) {

  const [open, setOpen] = useState(false);

  return (
    <div className="panel" style={{ marginBottom: "10px" }}>
      
      <div
        onClick={() => setOpen(!open)}
        style={{
          cursor: "pointer",
          fontWeight: "600",
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        {title}
        <span>{open ? "▲" : "▼"}</span>
      </div>

      {open && (
        <div style={{ marginTop: "10px" }}>
          {children}
        </div>
      )}

    </div>
  );
}

export default Collapsible;