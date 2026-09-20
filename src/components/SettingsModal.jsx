import React from 'react';
import { Settings, X, Timer, Volume2, Sparkles, Trash2, Sliders } from 'lucide-react';
import { DIFFICULTY_LEVELS } from '../utils/constants';
import '../css/SettingsModal.css';

/**
 * Right-Side Settings Drawer component for Arrow Flow options.
 */
export default function SettingsModal({
  isOpen = false,
  difficultyKey = 'MEDIUM',
  isTimerEnabled = true,
  isSoundEnabled = true,
  isAnimationsEnabled = true,
  onSelectDifficulty,
  onToggleTimer,
  onToggleSound,
  onToggleAnimations,
  onResetProgress,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="drawer-title-group">
            <Settings size={20} style={{ color: 'var(--accent-cyan)' }} />
            <h3 className="drawer-title">Game Settings</h3>
          </div>

          <button className="btn-close-drawer" onClick={onClose} title="Close Settings">
            <X size={20} />
          </button>
        </div>

        <div className="drawer-body">
          {/* Difficulty Setting Section */}
          <div className="setting-section">
            <span className="setting-section-title">Difficulty Level</span>
            <div className="drawer-difficulty-group">
              {Object.values(DIFFICULTY_LEVELS).map((level) => (
                <button
                  key={level.key}
                  className={`btn-drawer-diff ${difficultyKey === level.key ? 'active' : ''}`}
                  onClick={() => onSelectDifficulty && onSelectDifficulty(level.key)}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>

          {/* Gameplay Preferences Section */}
          <div className="setting-section">
            <span className="setting-section-title">Preferences</span>

            {/* Timer Toggle */}
            <div className="setting-row">
              <div className="setting-info">
                <span className="setting-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Timer size={16} style={{ color: 'var(--accent-indigo)' }} />
                  Game Timer
                </span>
                <span className="setting-desc">Display elapsed time while solving</span>
              </div>
              <button
                className={`toggle-switch ${isTimerEnabled ? 'active' : ''}`}
                onClick={onToggleTimer}
                aria-label="Toggle Timer"
              >
                <span className="toggle-knob" />
              </button>
            </div>

            {/* Sound Effects Toggle */}
            <div className="setting-row">
              <div className="setting-info">
                <span className="setting-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Volume2 size={16} style={{ color: 'var(--accent-cyan)' }} />
                  Sound Effects
                </span>
                <span className="setting-desc">Audio feedback on tile rotation & win</span>
              </div>
              <button
                className={`toggle-switch ${isSoundEnabled ? 'active' : ''}`}
                onClick={onToggleSound}
                aria-label="Toggle Sound"
              >
                <span className="toggle-knob" />
              </button>
            </div>

            {/* Tile Animations Toggle */}
            <div className="setting-row">
              <div className="setting-info">
                <span className="setting-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={16} style={{ color: '#facc15' }} />
                  Tile Animations
                </span>
                <span className="setting-desc">Smooth spring rotation transitions</span>
              </div>
              <button
                className={`toggle-switch ${isAnimationsEnabled ? 'active' : ''}`}
                onClick={onToggleAnimations}
                aria-label="Toggle Animations"
              >
                <span className="toggle-knob" />
              </button>
            </div>
          </div>

          {/* Reset Progress Section */}
          <div className="setting-section" style={{ marginTop: 'auto' }}>
            <span className="setting-section-title">Data Management</span>
            <button
              className="btn-reset-progress"
              onClick={() => {
                if (window.confirm('Clear all local daily progress and saved scores?')) {
                  onResetProgress && onResetProgress();
                }
              }}
            >
              <Trash2 size={16} />
              <span>Reset Daily Progress</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
