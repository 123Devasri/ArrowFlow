import React from 'react';
import { Cpu, CheckCircle2, XCircle } from 'lucide-react';
import '../css/AlgorithmInfo.css';

/**
 * Developer-Friendly Algorithm Information Component.
 * Displays live BFS vs DFS graph representation details and traversal metrics.
 */
export default function AlgorithmInfo({
  algoResult,
  activeAlgorithm = 'BFS',
  onSelectAlgorithm,
}) {
  if (!algoResult) return null;

  const {
    isReachable,
    path,
    visitedCount,
    totalVertices,
    nodesExplored,
  } = algoResult;

  const isBFS = activeAlgorithm === 'BFS';

  return (
    <div className="algo-info-container">
      <div className="algo-header">
        <div className="algo-title-group">
          <Cpu size={16} style={{ color: 'var(--accent-cyan)' }} />
          <span className="algo-title">
            Algorithm: {isBFS ? 'Breadth-First Search (BFS)' : 'Depth-First Search (DFS)'}
          </span>
        </div>

        {/* Algorithm Selector Pills (BFS vs DFS) */}
        <div className="algo-selector-tabs" title="Switch Graph Algorithm">
          <button
            className={`btn-algo-tab ${isBFS ? 'active' : ''}`}
            onClick={() => onSelectAlgorithm && onSelectAlgorithm('BFS')}
          >
            BFS
          </button>
          <button
            className={`btn-algo-tab ${!isBFS ? 'active' : ''}`}
            onClick={() => onSelectAlgorithm && onSelectAlgorithm('DFS')}
          >
            DFS
          </button>
        </div>
      </div>

      <div className="algo-grid-stats">
        <div className="algo-stat-box">
          <span className="algo-stat-label">Graph Vertices</span>
          <span className="algo-stat-val">|V| = {totalVertices}</span>
        </div>

        <div className="algo-stat-box">
          <span className="algo-stat-label">{isBFS ? 'BFS Explored' : 'DFS Explored'}</span>
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
          // Graph Model: Directed Adjacency List Map<br />
          {isBFS ? 'BFS FIFO Queue' : 'DFS LIFO Stack'} Operations: <span className="accent">{nodesExplored.length} steps</span> | Path: <span className="highlight">{isReachable ? `${path.length} tiles` : 'Unreachable'}</span>
        </code>
      </div>
    </div>
  );
}
