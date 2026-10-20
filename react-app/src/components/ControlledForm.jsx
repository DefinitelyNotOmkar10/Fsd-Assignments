import { useState } from "react";

/**
 * Controlled Form Component
 * Author: Omkar Kumbhar
 * Demonstrates unidirectional data flow and synchronous live state feedback
 */
export default function ControlledForm() {
  const initialData = {
    fullName: "",
    email: "",
    specialization: "Full-Stack Development",
    notes: "",
    newsletter: true,
  };

  const [formData, setFormData] = useState(initialData);
  const [submittedFeedback, setSubmittedFeedback] = useState(false);

  function handleInputChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleReset() {
    setFormData(initialData);
    setSubmittedFeedback(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmittedFeedback(true);
    setTimeout(() => setSubmittedFeedback(false), 4000);
  }

  return (
    <div className="controlled-layout">
      <form className="form-pane" onSubmit={handleSubmit}>
        <div className="pane-header">
          <h3>Developer Profile Form</h3>
          <p>State syncs in real-time as you enter information.</p>
        </div>

        <div className="input-field">
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            placeholder="Omkar Kumbhar"
            value={formData.fullName}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-field">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="omkar@example.com"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-field">
          <label htmlFor="specialization">Primary Track</label>
          <select
            id="specialization"
            name="specialization"
            value={formData.specialization}
            onChange={handleInputChange}
          >
            <option>Full-Stack Development</option>
            <option>React &amp; Modern UI</option>
            <option>Backend Architecture</option>
            <option>System Design &amp; DevOps</option>
          </select>
        </div>

        <div className="input-field">
          <label htmlFor="notes">Bio / Objectives</label>
          <textarea
            id="notes"
            name="notes"
            rows="3"
            placeholder="Briefly state your current dev goals..."
            value={formData.notes}
            onChange={handleInputChange}
          />
        </div>

        <label className="checkbox-field">
          <input
            type="checkbox"
            name="newsletter"
            checked={formData.newsletter}
            onChange={handleInputChange}
          />
          <span>Receive weekly developer updates &amp; digests</span>
        </label>

        <div className="form-action-row">
          <button type="submit" className="btn-primary">Save Info</button>
          <button type="button" className="btn-secondary" onClick={handleReset}>Clear All</button>
        </div>

        {submittedFeedback && (
          <div className="form-success-banner">
            State successfully synchronized!
          </div>
        )}
      </form>

      {/* Live State Inspector */}
      <aside className="preview-pane">
        <div className="preview-header">
          <span className="live-status-dot"></span>
          <h4>Live State Inspector</h4>
        </div>

        <div className="data-display-list">
          <div className="data-row">
            <span className="data-key">Name:</span>
            <span className="data-val">{formData.fullName || "—"}</span>
          </div>
          <div className="data-row">
            <span className="data-key">Email:</span>
            <span className="data-val">{formData.email || "—"}</span>
          </div>
          <div className="data-row">
            <span className="data-key">Track:</span>
            <span className="data-val highlight">{formData.specialization}</span>
          </div>
          <div className="data-row">
            <span className="data-key">Bio / Notes:</span>
            <span className="data-val">{formData.notes || "—"}</span>
          </div>
          <div className="data-row">
            <span className="data-key">Updates Opt-in:</span>
            <span className="data-val status-tag">{formData.newsletter ? "Subscribed" : "No"}</span>
          </div>
        </div>

        <div className="json-preview-box">
          <span className="code-label">RAW JSON STATE</span>
          <code>{JSON.stringify(formData, null, 2)}</code>
        </div>
      </aside>
    </div>
  );
}
