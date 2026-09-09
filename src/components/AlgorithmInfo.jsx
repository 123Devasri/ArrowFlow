import React from 'react';
import { Cpu, CheckCircle2, XCircle } from 'lucide-react';
import '../css/AlgorithmInfo.css';

/**
 * Developer-Friendly Algorithm Information Component.
 * Displays live BFS, DFS, and Dijkstra graph representation details and traversal metrics.
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
    optimalCost,
  } = algoResult;

  const algoLabel =
    activeAlgorithm === 'BFS'
      ? 'Breadth-First Search (BFS)'
      : activeAlgorithm === 'DFS'
      ? 'Depth-First Search (DFS)'
      : "Dijkstra's Algorithm (Weighted)";

  return (
    <div className="algo-info-container">
      <div className="algo-header">
        <div className="algo-title-group">
          <Cpu size={16} style={{ color: 'var(--accent-cyan)' }} />
          <span className="algo-title">Algorithm: {algoLabel}</span>
        </div>

        {/* Algorithm Selector Pills (BFS vs DFS vs Dijkstra) */}
        <div className="algo-selector-tabs" title="Switch Graph Solver Algorithm">
          <button
            className={`btn-algo-tab ${activeAlgorithm === 'BFS' ? 'active' : ''}`}
            onClick={() => onSelectAlgorithm && onSelectAlgorithm('BFS')}
          >
            BFS
          </button>
          <button
            className={`btn-algo-tab ${activeAlgorithm === 'DFS' ? 'active' : ''}`}
            onClick={() => onSelectAlgorithm && onSelectAlgorithm('DFS')}
          >
            DFS
          </button>
          <button
            className={`btn-algo-tab ${activeAlgorithm === 'DIJKSTRA' ? 'active' : ''}`}
            onClick={() => onSelectAlgorithm && onSelectAlgorithm('DIJKSTRA')}
          >
            Dijkstra
          </button>
        </div>
      </div>

      <div className="algo-grid-stats">
        <div className="algo-stat-box">
          <span className="algo-stat-label">Graph Vertices</span>
          <span className="algo-stat-val">|V| = {totalVertices}</span>
        </div>

        <div className="algo-stat-box">
          <span className="algo-stat-label">Nodes Explored</span>
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
          // Graph: Weighted Directed (Cost 1-3)<br />
          {activeAlgorithm === 'DIJKSTRA' ? 'Min-Cost Relaxation: ' : 'Search Traversal: '}
          <span className="accent">{nodesExplored.length} steps</span> |{' '}
          {activeAlgorithm === 'DIJKSTRA' ? (
            <>
              Optimal Cost: <span className="highlight">{isReachable ? optimalCost : 'Infinity'}</span>
            </>
          ) : (
            <>
              Path: <span className="highlight">{isReachable ? `${path.length} tiles` : 'Unreachable'}</span>
            </>
          )}
        </code>
      </div>
    </div>
  );
}
