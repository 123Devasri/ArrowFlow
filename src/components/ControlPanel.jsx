import React from 'react';
import { RotateCcw, Timer, TimerOff } from 'lucide-react';
import { formatTime } from '../utils/helpers';
import '../css/ControlPanel.css';

/**
 * Control toolbar component displaying live move stats, timer toggle, difficulty, and status.
 */
export default function ControlPanel({
  moveCount = 0,
  elapsedSeconds = 0,
  isTimerEnabled = true,
  gameStatus = 'IDLE',
  difficultyLabel = 'Medium',
  onReset,
  onToggleTimer,
}) {
  const isSolved = gameStatus === 'SOLVED';

  return (
    <div className="control-panel-container">
      <div className="panel-row">
        <div className="action-buttons">
          <button className="btn btn-secondary" onClick={onReset} title="Reset Grid & Stats">
            <RotateCcw size={16} />
            <span>Reset Board</span>
          </button>

          {/* Simple Timer ON / OFF Toggle Button */}
          <button
            className={`btn btn-timer-toggle ${isTimerEnabled ? 'active' : ''}`}
            onClick={onToggleTimer}
            title={isTimerEnabled ? 'Disable Timer' : 'Enable Timer'}
          >
            {isTimerEnabled ? <Timer size={16} /> : <TimerOff size={16} />}
            <span>Timer: {isTimerEnabled ? 'ON' : 'OFF'}</span>
          </button>
        </div>

        <div className="stats-card-group">
          <div className="stat-chip">
            <span className="stat-label">Mode</span>
            <span className="stat-value">{difficultyLabel}</span>
          </div>

          <div className="stat-chip">
            <span className="stat-label">Moves</span>
            <span className="stat-value">{moveCount}</span>
          </div>

          {isTimerEnabled && (
            <div className="stat-chip">
              <span className="stat-label">Time</span>
              <span className="stat-value" style={{ color: 'var(--accent-indigo)' }}>
                {formatTime(elapsedSeconds)}
              </span>
            </div>
          )}

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
