import React from 'react';
import { Zap, GitBranch, Award, Play } from 'lucide-react';
import '../css/AlgorithmCards.css';

/**
 * Dedicated Algorithms View Component for Arrow Flow.
 * Displays three clean selectable algorithm cards for BFS, DFS, and Dijkstra.
 */
export default function AlgorithmsPage({ onSelectAlgoMode }) {
  const cards = [
    {
      id: 'BFS',
      name: 'Breadth-First Search (BFS)',
      badge: 'Fewest Moves',
      badgeClass: 'badge-bfs',
      iconClass: 'card-icon-bfs',
      btnClass: 'btn-play-bfs',
      icon: <Zap size={22} />,
      purpose: 'Find a path connecting Start to Target using the fewest tile moves.',
    },
    {
      id: 'DFS',
      name: 'Depth-First Search (DFS)',
      badge: 'Reachable Paths',
      badgeClass: 'badge-dfs',
      iconClass: 'card-icon-dfs',
      btnClass: 'btn-play-dfs',
      icon: <GitBranch size={22} />,
      purpose: 'Explore all reachable paths and deep branch connections across the grid.',
    },
    {
      id: 'DIJKSTRA',
      name: "Dijkstra's Algorithm",
      badge: 'Minimum Cost',
      badgeClass: 'badge-dijkstra',
      iconClass: 'card-icon-dijkstra',
      btnClass: 'btn-play-dijkstra',
      icon: <Award size={22} />,
      purpose: 'Find the optimal minimum-cost route considering weighted tile movement (1, 2, 3).',
    },
  ];

  return (
    <div className="algo-cards-container">
      <div className="algo-section-header">
        <h2 className="algo-section-title">Select Algorithm Mode</h2>
        <p className="algo-section-desc">
          Choose a solver algorithm below to launch and play Arrow Flow in that game mode.
        </p>
      </div>

      <div className="algo-cards-grid">
        {cards.map((card) => (
          <div key={card.id} className="algo-card">
            <div className="algo-card-top">
              <div className="algo-card-header">
                <div className={`algo-card-icon ${card.iconClass}`}>
                  {card.icon}
                </div>
                <span className={`algo-mode-badge ${card.badgeClass}`}>
                  {card.badge}
                </span>
              </div>

              <h3 className="algo-card-name">{card.name}</h3>
              <p className="algo-card-purpose">{card.purpose}</p>
            </div>

            <button
              className={`btn-card-play ${card.btnClass}`}
              onClick={() => onSelectAlgoMode && onSelectAlgoMode(card.id)}
            >
              <Play size={16} fill="currentColor" />
              <span>Play {card.id} Mode</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
