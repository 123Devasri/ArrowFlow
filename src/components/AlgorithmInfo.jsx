import React from 'react';
import { Cpu, Network, CheckCircle2, XCircle } from 'lucide-react';
import '../css/AlgorithmInfo.css';

/**
 * Developer-Friendly Algorithm Information Component.
 * Displays live BFS graph representation details and traversal metrics.
 */
export default function AlgorithmInfo({ bfsResult }) {
  if (!bfsResult) return null;

  const {
    isReachable,
    path,
    visitedCount,
    totalVertices,
    nodesExplored,
  } = bfsResult;

  return (
    <div className="algo-info-container">
      <div className="algo-header">
        <div className="algo-title-group">
          <Cpu size={16} style={{ color: 'var(--accent-cyan)' }} />
          <span className="algo-title">Algorithm: Breadth-First Search (BFS)</span>
        </div>

        <span className="algo-tag">Graph G = (V, E)</span>
      </div>

      <div className="algo-grid-stats">
        <div className="algo-stat-box">
          <span className="algo-stat-label">Graph Vertices</span>
          <span className="algo-stat-val">|V| = {totalVertices}</span>
        </div>

        <div className="algo-stat-box">
          <span className="algo-stat-label">BFS Explored</span>
          <span className="algo-stat-val" style={{ color: 'var(--accent-indigo)' }}>
            {visitedCount} / {totalVertices}
          </span>
        </div>

        <div className="algo-stat-box">
          <span className="algo-stat-label">Target Reachable</span>
          <span
            className="algo-stat-val"
            style={{
              color: isReachable ? 'var(--accent-emerald)' : 'var(--accent-rose)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            {isReachable ? (
              <>
                <CheckCircle2 size={14} /> YES
              </>
            ) : (
              <>
                <XCircle size={14} /> NO
              </>
            )}
          </span>
        </div>
      </div>

      <div className="algo-code-snippet">
        <code>
          // Graph Model: Adjacency List (Directed)<br />
          BFS Queue Status: <span className="accent">{nodesExplored.length} FIFO pops</span> | Shortest Path: <span className="highlight">{isReachable ? `${path.length} steps` : 'Unreachable'}</span>
        </code>
      </div>
    </div>
  );
}
