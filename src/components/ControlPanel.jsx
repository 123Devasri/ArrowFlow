import React from 'react';
import { Play, RotateCcw, Sliders, Layers } from 'lucide-react';
import '../css/ControlPanel.css';

/**
 * Control toolbar component placeholder with game controls and metrics.
 */
export default function ControlPanel() {
  return (
    <div className="control-panel-container">
      <div className="panel-row">
        <div className="action-buttons">
          <button className="btn btn-primary" title="Start Flow Simulation">
            <Play size={16} />
            <span>Start Flow</span>
          </button>
          <button className="btn btn-secondary" title="Reset Grid">
            <RotateCcw size={16} />
            <span>Reset</span>
          </button>
        </div>

        <div className="stats-card-group">
          <div className="stat-chip">
            <span className="stat-label">Level</span>
            <span className="stat-value">01</span>
          </div>
          <div className="stat-chip">
            <span className="stat-label">Moves</span>
            <span className="stat-value">0</span>
          </div>
          <div className="stat-chip">
            <span className="stat-label">Status</span>
            <span className="stat-value" style={{ color: 'var(--accent-indigo)' }}>Idle</span>
          </div>
        </div>
      </div>
    </div>
  );
}
