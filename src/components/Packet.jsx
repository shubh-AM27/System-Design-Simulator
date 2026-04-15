import React from "react";

function Packet({ x, y }) {

  return (
    <div
      style={{
        position: "absolute",
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        background: "#22c55e",
        transform: `translate(${x}px, ${y}px)`
      }}
    />
  );

}

export default Packet;