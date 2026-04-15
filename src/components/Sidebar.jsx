import React from "react";

function Sidebar() {

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className="panel"
      style={{
      position: "absolute",
      top: "20px",
      left: "20px",
      width: "120px",
      padding: "10px",
      zIndex: 10
      }}
      >
      <h3>Components</h3>

      <div
      className="tool-item"
      draggable
      onDragStart={(event) =>
       event.dataTransfer.setData("application/reactflow", "Client")
        }
        >
        Client
      </div>

      <div
      className="tool-item"
      draggable
        onDragStart={(event) =>
        event.dataTransfer.setData("application/reactflow", "Load Balancer")
          }
          >
        Load Balancer
      </div>

      <div
          className="tool-item"
          draggable
          onDragStart={(event) =>
            event.dataTransfer.setData("application/reactflow", "API Server")
          }
        >
        API Server
      </div>

              <div
          className="tool-item"
          draggable
          onDragStart={(event) =>
            event.dataTransfer.setData("application/reactflow", "Database")
          }
        >
        Database
      </div>

    </div>
  );
}

export default Sidebar;