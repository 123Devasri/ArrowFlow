import React, { useState, useEffect } from 'react';
import GameBoard from './GameBoard';
import { getTodayDateStr, getDailyPuzzleNumber, generateDailyGrid } from '../utils/boardGenerator';
import { formatTime } from '../utils/helpers';
import { Calendar, Play, ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import '../css/DailyPuzzle.css';

/**
 * Dedicated Daily Puzzle View Component for Arrow Flow.
 * Renders the daily challenge overview card, reads/writes daily results from localStorage,
 * and launches the deterministic daily puzzle.
 */
export default function DailyPuzzle({ isTimerEnabled, onReturnToPlay }) {
  // State: whether player is currently playing today's board
  const [isPlaying, setIsPlaying] = useState(false);
  // Stored best result object from localStorage
  const [dailyResult, setDailyResult] = useState(null);

  const todayStr = getTodayDateStr();
  const puzzleNumber = getDailyPuzzleNumber(todayStr);

  const formattedDateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Load today's result from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`arrowflow_daily_${todayStr}`);
      if (saved) {
        setDailyResult(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to read daily puzzle result from localStorage', e);
    }
  }, [todayStr, isPlaying]);

  // Callback when player completes daily puzzle
  const handleDailyComplete = (stats) => {
    try {
      const payload = {
        moves: stats.moves,
        time: stats.time,
        cost: stats.cost,
        completedAt: new Date().toISOString(),
      };
      localStorage.setItem(`arrowflow_daily_${todayStr}`, JSON.stringify(payload));
      setDailyResult(payload);
    } catch (e) {
      console.error('Failed to save daily result to localStorage', e);
    }
  };

  // Pre-generate deterministic daily grid
  const initialDailyGrid = React.useMemo(() => {
    return generateDailyGrid(todayStr);
  }, [todayStr]);

  if (isPlaying) {
    return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <button
          className="btn-return-play"
          onClick={() => setIsPlaying(false)}
          style={{ maxWidth: '560px' }}
        >
          <ArrowLeft size={16} />
          <span>Back to Daily Overview</span>
        </button>

        <GameBoard
          isDailyMode={true}
          dailyDateStr={todayStr}
          initialDailyGrid={initialDailyGrid}
          isTimerEnabled={isTimerEnabled}
          onDailyComplete={handleDailyComplete}
        />
      </div>
    );
  }

  return (
    <div className="daily-overview-container">
      <div className="daily-card">
        <div className="daily-card-header">
          <div>
            <div className="today-pill-badge">
              <Sparkles size={14} />
              <span>Today • Daily #{puzzleNumber}</span>
            </div>
            <h2 className="daily-date-title" style={{ marginTop: '0.5rem' }}>
              {formattedDateStr}
            </h2>
            <p className="daily-mode-subtitle">Medium (5×5) • Weighted Movement Mode</p>
          </div>

          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              backgroundColor: 'rgba(56, 189, 248, 0.15)',
              color: 'var(--accent-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--glow-cyan)',
            }}
          >
            <Calendar size={24} />
          </div>
        </div>

        {/* Current Best Result Display */}
        <div className="daily-best-box">
          <div>
            <span className="daily-best-label">Today's Result</span>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              {dailyResult ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                  <CheckCircle2 size={16} /> Completed
                </span>
              ) : (
                'Not Played Yet'
              )}
            </div>
          </div>

          {dailyResult ? (
            <div className="daily-best-val">
              {dailyResult.moves} moves {dailyResult.time ? `(${formatTime(dailyResult.time)})` : ''}
            </div>
          ) : (
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>--</span>
          )}
        </div>

        <div className="daily-actions">
          <button className="btn-play-daily" onClick={() => setIsPlaying(true)}>
            <Play size={18} fill="currentColor" />
            <span>{dailyResult ? 'Replay Today\'s Challenge' : 'Play Daily Challenge'}</span>
          </button>

          <button className="btn-return-play" onClick={onReturnToPlay}>
            <ArrowLeft size={16} />
            <span>Return to Normal Play</span>
          </button>
        </div>
      </div>
    </div>
  );
}
