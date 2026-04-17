import React from "react";

function SuggestionPanel({ metrics }) {

  if (!metrics || metrics.length === 0) {
    return (
      <div style={{ width: "250px", padding: "20px", background: "#111827", color: "white" }}>
        Run simulation for suggestions
      </div>
    );
  }

  const suggestions = [];

  metrics.forEach(node => {

    if (node.overloaded) {
      suggestions.push(`Scale ${node.name} (add more instances)`);
    }

    if (node.queue > 200) {
      suggestions.push(`Consider adding caching before ${node.name}`);
    }

    if (node.latency > 300) {
      suggestions.push(`Increase capacity of ${node.name}`);
    }

  });

  return (
    <div className="panel" style={{ maxWidth: "100%", padding: "20px", background: "#111827", color: "white" }}>
      <h3>System Suggestions</h3>

      {suggestions.length === 0 ? (
        <div>✅ No optimization needed</div>
      ) : (
        suggestions.map((s, i) => (
          <div key={i} style={{ marginTop: "5px", color: "#34d399" }}>
            💡 {s}
          </div>
        ))
      )}

    </div>
  );
}

export default SuggestionPanel;