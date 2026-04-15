import React, { useCallback, useState, useRef } from "react";
import SystemNode from "../nodes/SystemNode";
import { useEffect } from "react";
import Packet from "./Packet";
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
  addEdge,
  useReactFlow
} from "reactflow";

import "reactflow/dist/style.css";

const nodeTypes = {
  systemNode: SystemNode
};

let id = 1;

function FlowCanvas({ nodes, setNodes, edges, setEdges, packets, setPackets, setSelectedNodeId }) {

  const reactFlowWrapper = useRef(null);
  const { project } = useReactFlow();

  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback(
  (params) =>
    setEdges((eds) =>
      addEdge(
        {
          ...params,
          animated: true,
          style: {
            stroke: "#60a5fa",
            strokeWidth: 3
          }
        },
        eds
      )
    ),
  []
);
useEffect(() => {

  setEdges(edges =>
    edges.map(edge => {

      const sourceNode = nodes.find(n => n.id === edge.source);

      const load = sourceNode?.data?.load || 0;

      return {
        ...edge,
        style: {
          stroke: getEdgeColor(load),
          strokeWidth: 3
        }
      };

    })
  );

}, [nodes]);

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onNodeClick = (event, node) => {
    setSelectedNodeId(node.id);
  };
  const onDrop = (event) => {
    event.preventDefault();

    const type = event.dataTransfer.getData("application/reactflow");

    const bounds = reactFlowWrapper.current.getBoundingClientRect();

    const position = project({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top
    });

    const newNode = {
      id: `${id++}`,
      position,
      data: { label: type,type: type,capacity: 100, latency: 10 },
      type: "systemNode",
    };

    setNodes((nds) => nds.concat(newNode));
  };

  const updateNode = (id, field, value) => {
  setNodes((nds) =>
    nds.map((node) =>
      node.id === id
        ? {
            ...node,
            data: {
              ...node.data,
              [field]: value
            }
          }
         : node
    )
   );
 };
const getEdgeColor = (load) => {

  if (load >= 2) {
    return "#ef4444";   // red
  }

  if (load >= 1) {
    return "#f97316";   // orange
  }

  return "#3b82f6";     // blue
};
useEffect(() => {

  const interval = setInterval(() => {

    setPackets(prev =>
      prev.map(packet => ({
        ...packet,
        progress: packet.progress + 0.02
      }))
    );

  }, 50);

  return () => clearInterval(interval);

}, []);
  return (
    <div
    ref={reactFlowWrapper}
    style={{
    width: "100%",
    height: "100vh"
    }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={onNodeClick}
      >
        < Background />
        <Controls />
        {packets.map(packet => (
        <Packet
          key={packet.id}
          x={packet.progress * 300}
          y={50}
            />
          ))}
      </ReactFlow>
    </div>
  );
}

function CanvasArea({ nodes, setNodes, edges, setEdges, packets, setPackets, setSelectedNodeId })  {
  return (
    <ReactFlowProvider>
      <FlowCanvas
        nodes={nodes}
        setNodes={setNodes}
        edges={edges}
        setEdges={setEdges}
        packets={packets}
        setPackets={setPackets}
        setSelectedNodeId={setSelectedNodeId}
      />
    </ReactFlowProvider>
  );
}

export default CanvasArea;