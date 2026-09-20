import React from 'react';
import GameBoard from './GameBoard';
import { Cpu } from 'lucide-react';

/**
 * Dedicated Algorithms View Component for Arrow Flow.
 * Features an interactive graph playground and detailed side-by-side comparison of BFS, DFS, and Dijkstra.
 */
export default function AlgorithmsPage({ isTimerEnabled }) {
  return (
    <div className="algorithms-page-view" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
      <div
        className="algo-header-card"
        style={{
          width: '100%',
          maxWidth: '560px',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--accent-indigo), var(--accent-purple))',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--glow-indigo)',
            }}
          >
            <Cpu size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Graph Traversal Algorithms
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Interactive Graph Theory Playground & Solver Analysis
            </p>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.65rem',
            marginTop: '0.25rem',
          }}
        >
          <div style={{ backgroundColor: 'var(--bg-dark)', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', fontWeight: 700, display: 'block' }}>BFS (Queue)</span>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>Shortest Unweighted Path</span>
          </div>
          <div style={{ backgroundColor: 'var(--bg-dark)', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--accent-indigo)', fontWeight: 700, display: 'block' }}>DFS (Stack)</span>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>Deep Branch Exploration</span>
          </div>
          <div style={{ backgroundColor: 'var(--bg-dark)', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--accent-purple)', fontWeight: 700, display: 'block' }}>Dijkstra</span>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>Weighted Min-Cost Path</span>
          </div>
        </div>
      </div>

      {/* Main Game Board canvas with active algorithm statistics */}
      <GameBoard showAlgorithmInfo={true} isTimerEnabled={isTimerEnabled} />
    </div>
  );
}
