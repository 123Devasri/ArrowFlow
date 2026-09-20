import React from 'react';
import { Navigation, Dices, RotateCcw, Cpu, ChevronDown, Settings } from 'lucide-react';
import '../css/Header.css';

/**
 * Single navigation header component for Arrow Flow.
 * Combines branding, game controls (New Game, Reset, Algorithm Dropdown), and Settings in one bar.
 */
export default function Header({
  activeAlgorithm = 'BFS',
  onSelectAlgorithm,
  onNewGame,
  onReset,
  onOpenSettings,
  isDailyMode = false,
}) {
  return (
    <header className="header-bar">
      {/* Brand Section */}
      <div className="brand-section">
        <div className="logo-badge">
          <Navigation size={22} />
        </div>
        <h1 className="brand-title">Arrow Flow</h1>
      </div>

      {/* Center Game Controls */}
      <div className="header-center-controls">
        {!isDailyMode && onNewGame && (
          <button className="btn-header-control primary" onClick={onNewGame} title="Generate brand new solvable puzzle">
            <Dices size={16} />
            <span>New Game</span>
          </button>
        )}

        {onReset && (
          <button className="btn-header-control" onClick={onReset} title="Reset current board to initial state">
            <RotateCcw size={16} />
            <span>Reset</span>
          </button>
        )}

        {onSelectAlgorithm && (
          <div className="header-algo-dropdown">
            <Cpu size={16} style={{ color: 'var(--accent-cyan)' }} />
            <select
              className="header-select-dropdown"
              value={activeAlgorithm}
              onChange={(e) => onSelectAlgorithm(e.target.value)}
              title="Select Algorithm Mode"
            >
              <option value="BFS">BFS Mode (Minimum Moves)</option>
              <option value="DFS">Perfect Route (Min Cost & Moves)</option>
              <option value="DIJKSTRA">Dijkstra Mode (Minimum Cost)</option>
            </select>
            <ChevronDown size={14} className="dropdown-chevron" />
          </div>
        )}
      </div>

      {/* Right Settings Action */}
      <div className="header-actions">
        {onOpenSettings && (
          <button className="btn-header-settings" onClick={onOpenSettings} title="Open Game Settings">
            <Settings size={18} />
            <span>Settings</span>
          </button>
        )}
      </div>
    </header>
  );
}
