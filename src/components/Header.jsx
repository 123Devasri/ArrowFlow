import React from 'react';
import { Navigation, Gamepad2, Calendar, Cpu, Settings } from 'lucide-react';
import '../css/Header.css';

/**
 * Top navigation header component for Arrow Flow with destination tabs and Settings button.
 */
export default function Header({ activeTab = 'play', onTabChange, onOpenSettings }) {
  return (
    <header className="header-bar">
      <div className="brand-section">
        <div className="logo-badge">
          <Navigation size={22} />
        </div>
        <h1 className="brand-title">Arrow Flow</h1>
      </div>

      {/* Main Top Navigation Destinations */}
      <nav className="nav-tabs">
        <button
          className={`nav-tab ${activeTab === 'play' ? 'active' : ''}`}
          onClick={() => onTabChange && onTabChange('play')}
        >
          <Gamepad2 size={16} />
          <span>Play</span>
        </button>

        <button
          className={`nav-tab ${activeTab === 'daily' ? 'active' : ''}`}
          onClick={() => onTabChange && onTabChange('daily')}
        >
          <Calendar size={16} />
          <span>Daily Puzzle</span>
        </button>

        <button
          className={`nav-tab ${activeTab === 'algorithms' ? 'active' : ''}`}
          onClick={() => onTabChange && onTabChange('algorithms')}
        >
          <Cpu size={16} />
          <span>Algorithms</span>
        </button>
      </nav>

      {/* Right Side Settings Action Button */}
      <div className="header-actions">
        <button
          className="btn-settings"
          onClick={onOpenSettings}
          title="Open Settings"
          aria-label="Settings"
        >
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
}
