import { useState } from "react";
import ProfileCard from "./components/ProfileCard.jsx";
import ControlledForm from "./components/ControlledForm.jsx";
import Counter from "./components/Counter.jsx";

const assignmentTabs = [
  { id: "profile", label: "01 · Profile Showcase", sub: "Props & State" },
  { id: "form", label: "02 · Controlled Form", sub: "Form State" },
  { id: "counter", label: "03 · Dynamic Counter", sub: "useState Hook" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="portfolio-shell">
      <header className="portfolio-header">
        <div className="badge-row">
          <span className="developer-tag">Crafted by Omkar Kumbhar</span>
          <span className="version-tag">React 18 · Vite</span>
        </div>
        <h1 className="main-title">Frontend Developer Workspace</h1>
        <p className="main-subtitle">
          Interactive components demonstrating modular React patterns, controlled inputs, and state management.
        </p>

        <nav className="tab-navigation" aria-label="Assignment tabs">
          {assignmentTabs.map((tab) => (
            <button
              key={tab.id}
              className={`nav-tab-btn ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-label">{tab.label}</span>
              <span className="tab-sub">{tab.sub}</span>
            </button>
          ))}
        </nav>
      </header>

      <main className="component-container">
        {activeTab === "profile" && (
          <div className="profile-grid">
            <ProfileCard
              name="Omkar Kumbhar"
              role="Frontend Engineer"
              imageUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
              description="Passionate about designing sleek UI experiences, modular React architectures, and high-performance web apps."
            />
            <ProfileCard
              name="Aria Vance"
              role="UI/UX Specialist"
              imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80"
              description="Crafting minimalist design systems, subtle micro-interactions, and accessible web interfaces."
            />
            <ProfileCard
              name="Devin Chen"
              role="Full-Stack Dev"
              imageUrl="https://invalid-avatar-url.internal/user.png"
              description="Fallback test card: Demonstrates automated initials fallback rendering when network asset fails."
            />
          </div>
        )}

        {activeTab === "form" && <ControlledForm />}

        {activeTab === "counter" && <Counter />}
      </main>

      <footer className="portfolio-footer">
        <p>Built with React & Vite · Portfolio by Omkar Kumbhar</p>
      </footer>
    </div>
  );
}
