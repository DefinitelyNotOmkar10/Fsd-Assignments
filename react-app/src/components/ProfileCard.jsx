import { useState } from "react";

/**
 * Profile Card Component
 * Author: Omkar Kumbhar
 * Demonstrates component props, graceful fallback rendering, and hover styling
 */
export default function ProfileCard({ name, role, imageUrl, description }) {
  const [hasImageError, setHasImageError] = useState(false);

  // Generate clean initials if image cannot load
  const userInitials = name
    .split(" ")
    .filter(Boolean)
    .map((chunk) => chunk[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="profile-card">
      <div className="card-banner" />
      <div className="avatar-wrapper">
        {hasImageError ? (
          <div className="avatar-placeholder" aria-label={name}>
            {userInitials}
          </div>
        ) : (
          <img
            className="avatar-img"
            src={imageUrl}
            alt={name}
            onError={() => setHasImageError(true)}
            loading="lazy"
          />
        )}
      </div>

      <div className="profile-body">
        <h3 className="profile-name">{name}</h3>
        {role && <span className="profile-role">{role}</span>}
        <p className="profile-bio">{description}</p>
        
        <div className="card-action-bar">
          <button className="btn-connect" onClick={() => alert(`Connecting with ${name}`)}>
            View Profile
          </button>
        </div>
      </div>
    </article>
  );
}
