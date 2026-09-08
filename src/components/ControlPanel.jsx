import React from 'react';
import { RotateCcw } from 'lucide-react';
import '../css/ControlPanel.css';

/**
 * Control toolbar component displaying live move stats and status.
 */
export default function ControlPanel({ moveCount = 0, gameStatus = 'IDLE', onReset }) {
  const isSolved = gameStatus === 'SOLVED';

  return (
    <div className="control-panel-container">
      <div className="panel-row">
        <div className="action-buttons">
          <button className="btn btn-secondary" onClick={onReset} title="Reset Grid & Moves">
            <RotateCcw size={16} />
            <span>Reset Board</span>
          </button>
        </div>

        <div className="stats-card-group">
          <div className="stat-chip">
            <span className="stat-label">Level</span>
            <span className="stat-value">01</span>
          </div>
          <div className="stat-chip">
            <span className="stat-label">Moves</span>
            <span className="stat-value">{moveCount}</span>
          </div>
          <div className="stat-chip">
            <span className="stat-label">Status</span>
            <span
              className="stat-value"
              style={{
                color: isSolved ? 'var(--accent-emerald)' : 'var(--accent-cyan)',
              }}
            >
              {isSolved ? 'SOLVED' : 'ACTIVE'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
