import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import CanvasArea from "./components/CanvasArea";
import "./index.css";
import NodeConfigPanel from "./components/NodeConfigPanel";
import SimulationPanel from "./components/SimulationPanel";
import MetricsDashboard from "./components/MetricsDashboard";
import BottleneckPanel from "./components/BottleneckPanel";
import SuggestionPanel from "./components/SuggestionPanel";
import Collapsible from "./components/Collapsible";

function App() {

  const [nodes, setNodes] = useState([]);
  const [panelCollapsed, setPanelCollapsed] = useState(false);
  const [packets, setPackets] = useState([]);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [metrics, setMetrics] = useState([]);
  const selectedNode = nodes.find(n => n.id === selectedNodeId);
  const [edges, setEdges] = useState([]);
  
  

  const updateNode = (id, field, value) => {
    setNodes(nodes =>
      nodes.map(node =>
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
  
  const runSimulation = (traffic) => {

  let nodeTraffic = {};

  nodes.forEach(node => {
    nodeTraffic[node.id] = 0;
  });

  const sourceNodes = nodes.filter(node =>
    !edges.some(edge => edge.target === node.id)
  );

  sourceNodes.forEach(node => {
    nodeTraffic[node.id] = traffic;
  });

  const queue = [...sourceNodes];

  while (queue.length > 0) {

  const currentNode = queue.shift();

  const outgoingEdges = edges.filter(e => e.source === currentNode.id);

  outgoingEdges.forEach(edge => {

    const targetNode = nodes.find(n => n.id === edge.target);
    const sourceTraffic = nodeTraffic[currentNode.id] || 0;

    let trafficShare = sourceTraffic;

    if (currentNode.data.type === "LoadBalancer") {
      trafficShare = sourceTraffic / outgoingEdges.length;
    }
    else if (currentNode.data.type === "Cache") {
      trafficShare = sourceTraffic * 0.5;
    }

  
    else if (currentNode.data.type === "CDN") {
      trafficShare = sourceTraffic * 0.3;
    }

    
    else if (currentNode.data.type === "MessageQueue") {
      trafficShare = sourceTraffic;
    }

    nodeTraffic[targetNode.id] += trafficShare;

    queue.push(targetNode);
    

  });

}
  const newPackets = edges.map(edge => ({
    id: Math.random(),
    source: edge.source,
    target: edge.target,
    progress: 0
  }));

  setPackets(newPackets);

  const results = nodes.map(node => {

    const capacity = node.data.capacity || 100;
    const latency = node.data.latency || 10;

    const incomingTraffic = nodeTraffic[node.id];

    const processed = Math.min(incomingTraffic, capacity);
    const queued = Math.max(incomingTraffic - capacity, 0);

    const load = incomingTraffic / capacity;

    let totalLatency = latency + queued;

    
    if (node.data.type === "MessageQueue") {
      totalLatency += 50;
    }

  
    if (node.data.type === "Cache") {
      totalLatency -= 5;
    }
    return {
      name: node.data.label,
      load: Number(load.toFixed(2)),
      latency: totalLatency,
      queue: queued,
      overloaded: load > 1
};
  });

  setMetrics(results);

  setNodes(nodes =>
  nodes.map(node => {

    const capacity = node.data.capacity || 100;
    const baseLatency = node.data.latency || 10;

    const incomingTraffic = nodeTraffic[node.id] || 0;

    const queued = Math.max(incomingTraffic - capacity, 0);
    const load = incomingTraffic / capacity;

    const totalLatency = baseLatency + queued;

    return {
      ...node,
      data: {
        ...node.data,
        load: load,
        overloaded: load > 1,
        queue: queued,
        latency: totalLatency
      }
    };

  })
);

};
  return (
    <div style={{ height: "100vh", position: "relative" }}>
      <Sidebar />
      

      <CanvasArea
      nodes={nodes}
      setNodes={setNodes}
      edges={edges}
      setEdges={setEdges}
      packets={packets}
      setPackets={setPackets}
      setSelectedNodeId={setSelectedNodeId}
      />
     
      
      
      <div
        className="panel"
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          right: panelCollapsed ? "20px" : "20px",
          width: panelCollapsed ? "40px" : "260px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "10px",
          zIndex: 10,
          transition: "0.3s",
          overflowY: "auto",
          maxHeight: "93%"
        }}
      >
        <button
        onClick={() => setPanelCollapsed(!panelCollapsed)}
        style={{
          alignSelf: "flex-end",
          padding: "10px",
          width: "40px",
          right: "10px",
          margin: "0px"
          
        }}
      >
        {panelCollapsed ? "⚙️" : "❌"}
      </button>
      {!panelCollapsed && (
      <>

        <Collapsible title="🧩 Selected Node">
          <NodeConfigPanel
            selectedNode={selectedNode}
            updateNode={updateNode}
          />
        </Collapsible>

        <Collapsible title="⚙ Simulation">
          <SimulationPanel runSimulation={runSimulation} />
        </Collapsible>

        <Collapsible title="📊 Metrics">
          <MetricsDashboard metrics={metrics} />
        </Collapsible>

        <Collapsible title="⚠ Alerts">
          <BottleneckPanel metrics={metrics} />
        </Collapsible>

        <Collapsible title="💡 Suggestions">
          <SuggestionPanel metrics={metrics} />
        </Collapsible>
       </>
      )}
      </div>
      
    </div>
    
  );
}

export default App;