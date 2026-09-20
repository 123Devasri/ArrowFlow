import React from 'react';
import { Settings, X, Timer, Layers, Info } from 'lucide-react';
import '../css/SettingsModal.css';

/**
 * Minimal Settings Modal Dialog component for Arrow Flow options.
 */
export default function SettingsModal({
  isOpen = false,
  isTimerEnabled = true,
  onToggleTimer,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <Settings size={20} style={{ color: 'var(--accent-cyan)' }} />
            <h3 className="modal-title">Game Settings</h3>
          </div>

          <button className="btn-close-modal" onClick={onClose} title="Close Settings">
            <X size={18} />
          </button>
        </div>

        <div className="settings-group">
          {/* Timer Toggle Setting */}
          <div className="setting-row">
            <div className="setting-info">
              <span className="setting-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Timer size={16} style={{ color: 'var(--accent-indigo)' }} />
                Optional Game Timer
              </span>
              <span className="setting-desc">Display elapsed time while solving puzzles</span>
            </div>

            <button
              className={`toggle-switch ${isTimerEnabled ? 'active' : ''}`}
              onClick={onToggleTimer}
              aria-label="Toggle Timer"
            >
              <span className="toggle-knob" />
            </button>
          </div>

          {/* Game Information Info Card */}
          <div className="setting-row" style={{ backgroundColor: 'rgba(30, 41, 59, 0.4)' }}>
            <div className="setting-info">
              <span className="setting-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Info size={16} style={{ color: 'var(--accent-cyan)' }} />
                Arrow Flow Engine
              </span>
              <span className="setting-desc">Version 0.1.0 — Powered by BFS, DFS & Dijkstra Graph Solvers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
