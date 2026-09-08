import React from 'react';
import { Navigation, Sparkles } from 'lucide-react';
import '../css/Header.css';

/**
 * Top navigation header component for Arrow Flow.
 */
export default function Header() {
  return (
    <header className="header-bar">
      <div className="brand-section">
        <div className="logo-badge">
          <Navigation size={24} />
        </div>
        <div>
          <h1 className="brand-title">Arrow Flow</h1>
          <p className="brand-subtitle">Directional Puzzle & Pathing Interface</p>
        </div>
      </div>

      <div className="header-status">
        <div className="status-badge">
          <span className="status-dot"></span>
          <span>UI Ready</span>
        </div>
      </div>
    </header>
  );
}
