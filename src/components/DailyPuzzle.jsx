import React from 'react';
import GameBoard from './GameBoard';
import { Calendar, Flame } from 'lucide-react';
import '../css/App.css';

/**
 * Daily Puzzle View Component for Arrow Flow.
 * Displays today's seeded challenge puzzle with daily streak metrics.
 */
export default function DailyPuzzle({ isTimerEnabled }) {
  // Format today's date
  const todayDateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="daily-puzzle-view" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
      <div
        className="daily-header-card"
        style={{
          width: '100%',
          maxWidth: '560px',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: 'rgba(56, 189, 248, 0.15)',
              color: 'var(--accent-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Calendar size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Daily Flow Challenge
            </h2>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{todayDateStr}</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              backgroundColor: 'rgba(250, 204, 21, 0.12)',
              border: '1px solid rgba(250, 204, 21, 0.3)',
              color: '#facc15',
              fontSize: '0.8rem',
              fontWeight: 700,
              padding: '0.3rem 0.75rem',
              borderRadius: '8px',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <Flame size={15} />
            <span>Streak: 1</span>
          </div>
        </div>
      </div>

      {/* Main Game Board loaded with today's challenge */}
      <GameBoard isTimerEnabled={isTimerEnabled} />
    </div>
  );
}
