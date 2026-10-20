import { useState } from "react";

/**
 * Interactive Counter Component
 * Author: Omkar Kumbhar
 * Demonstrates functional state updates, step adjustments, and dynamic indicator colors
 */
export default function Counter() {
  const [count, setCount] = useState(0);
  const [stepSize, setStepSize] = useState(1);

  // Dynamic status evaluation
  let statusBadge = "Neutral";
  let statusThemeClass = "neutral";

  if (count > 0) {
    statusBadge = "Positive (+)";
    statusThemeClass = "positive";
  } else if (count < 0) {
    statusBadge = "Negative (−)";
    statusThemeClass = "negative";
  }

  return (
    <div className="counter-widget">
      <header className="widget-header">
        <span className="counter-subhead">React useState Experiment</span>
        <span className={`status-pill ${statusThemeClass}`}>{statusBadge}</span>
      </header>

      <div className={`counter-screen ${statusThemeClass}`}>
        <span className="display-digit">{count}</span>
      </div>

      <div className="step-picker">
        <span className="step-label">Step Increment:</span>
        {[1, 5, 10].map((val) => (
          <button
            key={val}
            className={`step-btn ${stepSize === val ? "selected" : ""}`}
            onClick={() => setStepSize(val)}
          >
            ±{val}
          </button>
        ))}
      </div>

      <div className="control-button-grid">
        <button
          className="btn-counter minus"
          onClick={() => setCount((c) => c - stepSize)}
          aria-label="Decrement count"
        >
          <span className="btn-icon">−</span>
          <span>Decrement</span>
        </button>

        <button
          className="btn-counter reset"
          onClick={() => setCount(0)}
          aria-label="Reset count to zero"
        >
          Reset
        </button>

        <button
          className="btn-counter plus"
          onClick={() => setCount((c) => c + stepSize)}
          aria-label="Increment count"
        >
          <span className="btn-icon">+</span>
          <span>Increment</span>
        </button>
      </div>
    </div>
  );
}
