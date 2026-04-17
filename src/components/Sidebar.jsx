import React, { useState } from "react";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

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
        width: collapsed ? "40px" : "120px",
        padding: "10px",
        zIndex: 10,
        transition: "0.3s"
      }}
      >
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          padding: "10px",
          width: "40px"
        }}
      >
        {collapsed ? "🔧" : "❌"}
      </button>
      {!collapsed && (
      <>
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
      <div
          className="tool-item"
          draggable
          onDragStart={(event) =>
            event.dataTransfer.setData("application/reactflow", "Cache")
          }
        >
          Cache
      </div>

      <div
        className="tool-item"
        draggable
        onDragStart={(event) =>
          event.dataTransfer.setData("application/reactflow", "MessageQueue")
        }
      >
        Queue
      </div>

      <div
        className="tool-item"
        draggable
        onDragStart={(event) =>
          event.dataTransfer.setData("application/reactflow", "CDN")
        }
      >
        CDN
      </div>
     </>
      )}

    </div>
  );
}

export default Sidebar;